import { defineEventHandler, readBody } from 'h3';
import User from '~/server/models/user';
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
      return { status: 400, message: 'Invalid input', errors: parsedBody.error.errors };
    }

    const data = parsedBody.data as LoginDto;
    
    const user = await User.findOne({ email: data.email });
    if (!user) {
        return { status: 404, message: 'User not found.' };
    }

    const isPasswordValid = await argon2.verify(user.passwordHash, data.password);
    if (!isPasswordValid) {
        // Show a generic error message to avoid user enumeration
        return { status: 404, message: 'User not found' }; 
    }

    const model: IUserModel = {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        technologies: user.technologies,
        initialRole: user.initialRole,
        roles: user.roles.map((role: string) => role as 'noob' | 'pro'),
        superNoob: user.startedAsSuperBeginner,
    };

    return { status: 201, message: 'Logged in successfully.', user: model };
  } catch (error: any) {
    return { status: 500, message: 'Internal server error.', error: error?.message };
  }
});
