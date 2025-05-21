import { defineEventHandler, readBody, setCookie, setResponseStatus } from 'h3';
import User from '~/server/models/user';
import { generateToken } from '~/server/auth/tokens';
import {
  loginDtoSchema,
  LoginDto,
  IUserModel,
} from '~/shared/user';
import * as argon2 from 'argon2';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    // Validate the request body against the schema
    const parsedBody = loginDtoSchema.safeParse(body);
    if (!parsedBody.success) {
      setResponseStatus(event, 400);
      return { status: 400, message: 'Invalid input', errors: parsedBody.error.errors };
    }

    const data = parsedBody.data as LoginDto;
    
    const user = await User.findOne({ email: data.email });
    if (!user) {
        setResponseStatus(event, 404);
        return { status: 404, message: 'User not found.' };
    }

    const isPasswordValid = await argon2.verify(user.passwordHash, data.password);
    if (!isPasswordValid) {
        setResponseStatus(event, 404);
        return { status: 404, message: 'User not found' }; 
    }

    const model: IUserModel = {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        technologies: user.technologies,
        initialRole: user.initialRole,
        roles: user.roles.map((role: string) => role as 'noob' | 'pro'),
        startedAsSuperBeginner: user.startedAsSuperBeginner,
    };

    const token = generateToken(model.id);
    setCookie(event, 'token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict', 
        maxAge: 60 * 60 * 24, // 1 day
    });

    setResponseStatus(event, 201);
    return { status: 201, message: 'Logged in successfully.', user: model };
  } catch (error: any) {
    setResponseStatus(event, 500);
    return { status: 500, message: 'Internal server error.', error: error?.message };
  }
});
