import { IUserModel, LoginDto } from '~/shared/user';
import { User, UserRecord, userToModel } from '../user/user';
import { verify } from 'argon2';
import { generateToken, verifyToken } from './tokens';
import { setCookie, H3Event, EventHandlerRequest } from 'h3';
import { Result } from '~/server/utils/result';
import { injectable } from 'inversify';

@injectable()
export class LoginService {
  private constructor() {}

  public async login(
    event: H3Event<EventHandlerRequest>,
    data: LoginDto
  ): Promise<Result<IUserModel>> {
    const user = await UserRecord.findOne({ email: data.email });
    if (!user) {
      return Result.Fail('Invalid email or password');
    }

    const isPasswordValid = await verify(user.passwordHash, data.password);
    if (!isPasswordValid) {
      // Show a generic error message to avoid user enumeration
      return Result.Fail('Invalid email or password');
    }

    const model = userToModel(user);
    const token = generateToken(model.id);

    setCookie(event, 'token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
    });

    return Result.Ok(model);
  }

  public async userFromToken(token: string): Promise<Result<User>> {
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
}
