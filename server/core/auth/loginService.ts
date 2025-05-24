import { User, UserRecord } from '../user/user';
import argon2 from 'argon2';
import { generateToken, verifyToken, generatePasswordRecoveryToken, verifyPasswordRecoveryToken } from './tokens';
import { setCookie, H3Event, EventHandlerRequest } from 'h3';
import { Result } from '~/server/utils/result';
import { injectable } from 'inversify';
import { LoginDto } from '~/shared/user/loginDto';
import { UserService } from '../user/userService';
import { IMailService } from '~/server/infra/mail';
import { PasswordRecoveryRecord } from './passwordRecovery';

@injectable()
export class LoginService {
  private constructor(
    @inject(UserService)
    private readonly userService: UserService,

    @inject(MailServiceSid)
    private readonly mailService: IMailService,
  ) { }

  public async login(
    event: H3Event<EventHandlerRequest>,
    data: LoginDto
  ): Promise<Result<User>> {
    const user = await UserRecord.findOne({ email: data.email });
    if (!user) {
      return Result.Fail('Invalid email or password');
    }

    const isPasswordValid = await argon2.verify(user.passwordHash, data.password);
    if (!isPasswordValid) {
      // Show a generic error message to avoid user enumeration
      return Result.Fail('Invalid email or password');
    }

    const token = generateToken(user.id);

    setCookie(event, 'token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
    });

    return Result.Ok(user);
  }

  public async getUserFromToken(token: string): Promise<Result<User>> {
    let userId: string;
    try {
      userId = verifyToken(token);
    } catch (error) {
      return Result.Fail('Invalid token');
    }

    const user = await UserRecord.findOne({ _id: userId });
    if (!user) {
      return Result.Fail('User not found');
    }

    return Result.Ok(user);
  }

  public async startPasswordReset(email: string): Promise<Result<boolean>> { // TODO(titosilva): create a version of Result that doesn't return a value
    const user = await this.userService.findUserByEmail(email);
    if (user.isFailure) {
      return Result.Fail('User not found');
    }

    let nonce = Math.floor(Math.random() * 1000000); // TODO(titosilva): use a better nonce generation strategy
    while (await PasswordRecoveryRecord.findOne({ nonce })) {
      // Verify that the nonce is unique
      nonce = Math.floor(Math.random() * 1000000);
    }

    PasswordRecoveryRecord.create({
      userId: user.data!._id,
      nonce: nonce.toString(),
    });

    const token = generatePasswordRecoveryToken(user.data!._id.toString(), nonce.toString());

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    const subject = 'Pros4Noobs - Password Reset';
    const text = `Hello ${user.data!.name},\n\nTo reset your password, please click the link below:\n${resetLink}\n\nIf you did not request this, please ignore this email.`;

    this.mailService.sendMail({
      to: email,
      subject,
      text,
    });

    return Result.Ok(true);
  }

  public async resetPassword(token: string, newPassword: string): Promise<Result<boolean>> {
    let userId: string;
    let nonce: string;
    try {
      [userId, nonce] = verifyPasswordRecoveryToken(token);
    } catch (error) {
      return Result.Fail('Invalid token');
    }

    const passwordRecovery = await PasswordRecoveryRecord.findOne({ userId, nonce });
    if (!passwordRecovery) {
      return Result.Fail('Invalid token');
    }

    if (passwordRecovery.usedAt) {
      return Result.Fail('Recovery link already used');
    }

    const user = await UserRecord.findById(userId);
    if (!user) {
      return Result.Fail('User not found');
    }

    const passwordHash = await argon2.hash(newPassword, { // TODO(titosilva): move this to a password service
      type: argon2.argon2id, // Uses Argon2id for resistance to side-channel attacks
      memoryCost: 2 ** 16,   // 64 MB of memory (standard for Argon2)
      timeCost: 3,           // Iterations (3 is generally considered secure)
      parallelism: 1,        // Number of threads (1 for server-side hashing)
      hashLength: 32,        // Length of the resulting hash
    });

    user.passwordHash = passwordHash;
    await user.save();

    passwordRecovery.usedAt = new Date();
    await passwordRecovery.save();

    return Result.Ok(true);
  }
}
