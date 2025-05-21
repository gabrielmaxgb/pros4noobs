import { defineEventHandler, readBody, setCookie, setResponseStatus } from 'h3';
import User from '~/server/models/user';
import { generateToken } from '~/server/auth/tokens';
import {
  loginDtoSchema,
  LoginDto,
  IUserModel,
} from '~/shared/user';
import * as argon2 from 'argon2';
import { Ok, Created, NotFound, BadRequest, InternalServerError } from '~/server/utils/response';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    // Validate the request body against the schema
    const parsedBody = loginDtoSchema.safeParse(body);
    if (!parsedBody.success) {
      return BadRequest(event, 'Invalid input');
    }

    const data = parsedBody.data as LoginDto;
    
    const user = await User.findOne({ email: data.email });
    if (!user) {
        return NotFound(event, 'User not found.');
    }

    const isPasswordValid = await argon2.verify(user.passwordHash, data.password);
    if (!isPasswordValid) {
        return NotFound(event, 'User not found'); 
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

    return Ok(event, model, 'Logged in successfully.');
  } catch (error: any) {
    return InternalServerError(event, 'Internal server error.');
  }
});
