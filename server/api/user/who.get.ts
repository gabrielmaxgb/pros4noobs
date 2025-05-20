import { defineEventHandler, getCookie } from 'h3';
import { verifyToken } from '~/server/core/auth/tokens';
import { UserRecord, userToModel } from '~/server/core/user/user';
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

    const user = await UserRecord.findOne({ _id: userId });
    if (!user) {
      return { status: 404, message: 'User not found.' };
    }

    const model = userToModel(user);

    return { status: 201, message: 'I know who you are.', user: model };
  } catch (error: any) {
    return { status: 500, message: 'Internal server error.', error: error?.message };
  }
});
