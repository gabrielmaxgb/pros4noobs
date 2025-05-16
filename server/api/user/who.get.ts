import { defineEventHandler, getCookie } from 'h3';
import User from '~/server/models/user';
import { verifyToken } from '~/server/auth/tokens';
import {
  IUserModel,
} from '~/shared/user';

export default defineEventHandler(async (event) => {
  try {
    const token = getCookie(event, 'token');
    if (!token) {
      return { status: 401, message: 'Unauthorized. No token provided.' };
    }

    let userId: string;
    try {
        userId = verifyToken(token);
    } catch (error) {
        return { status: 401, message: 'Unauthorized. Invalid token.' };
    }
    
    const user = await User.findOne({ _id: userId });
    if (!user) {
        return { status: 404, message: 'User not found.' };
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

    return { status: 201, message: 'I know who you are.', user: model };
  } catch (error: any) {
    return { status: 500, message: 'Internal server error.', error: error?.message };
  }
});
