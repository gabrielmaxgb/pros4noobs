import {
  Ok,
  Created,
  NotFound,
  BadRequest,
  Unauthorized,
  InternalServerError,
} from '~/server/utils/response';
import { setResponseStatus } from 'h3';
import User from '~/server/models/user';
import { verifyToken } from '~/server/auth/tokens';
import { IUserModel } from '~/shared/user';

export default defineEventHandler(async (event) => {
  try {
    const token = getCookie(event, 'token');
    if (!token) {
      return Unauthorized(event, 'Unauthorized. No token provided.');
    }

    let userId: string;
    try {
      userId = verifyToken(token);
    } catch (error) {
      return Unauthorized(event, 'Unauthorized. Invalid token.');
    }

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return NotFound(event, 'User not found.');
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

    return Ok(event, model, 'I know who you are.');
  } catch (error: any) {
    return InternalServerError(event, 'Internal server error.');
  }
});
