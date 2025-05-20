import { IUserModel, LoginDto } from "~/shared/user";
import { UserRecord, userToModel } from "../user/user";
import { verify } from "argon2";
import { generateToken } from "./tokens";
import { setCookie, H3Event, EventHandlerRequest } from "h3";
import { Result } from "~/server/utils/result";

export class LoginService {
    private static instance: LoginService | null = null;

    private constructor() { }

    public static getInstance(): LoginService {
        if (!this.instance) {
            this.instance = new LoginService();
        }
        return this.instance;
    }

    public async login(event: H3Event<EventHandlerRequest>, data: LoginDto): Promise<Result<IUserModel>> {
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
}