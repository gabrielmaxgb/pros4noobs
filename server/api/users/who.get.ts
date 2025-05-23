import {
  Ok,
  NotFound,
  Unauthorized,
  InternalServerError,
} from '~/server/utils/response';
import { UserRecord, userToModel } from '~/server/core/user/user';
import { verifyToken } from '~/server/core/auth/tokens';
import { IUserModel } from '~/shared/user';
import { useScope } from '~/server/core/container';
import { LoginService } from '~/server/core/auth/loginService';

export default defineEventHandler(async (event) => {
  try {
    const token = getCookie(event, 'token');
    if (!token) {
      return Unauthorized(event, 'Unauthorized. No token provided.');
    }

    const scope = useScope();
    const result = await scope.get(LoginService);

    if (result.isFailure) {
      return Unauthorized(event, 'Unauthorized. Invalid token.');
    }

    const user = result.data!;
    const model = userToModel(user);
    return Ok(event, model, 'I know who you are.');
  } catch (error: any) {
    return InternalServerError(event, 'Internal server error.');
  }
});
