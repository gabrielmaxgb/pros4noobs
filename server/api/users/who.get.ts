import {
  Ok,
  Unauthorized,
  InternalServerError,
} from '~/server/utils/response';
import { userToModel } from '~/server/core/user/user';
import { useScope } from '~/server/core/container';
import { LoginService } from '~/server/core/auth/loginService';

export default defineEventHandler(async (event) => {
  try {
    const token = getCookie(event, 'token');
    if (!token) {
      return Unauthorized('Unauthorized. No token provided.');
    }

    const scope = useScope();
    const result = await scope.get(LoginService);

    if (result.isFailure) {
      return Unauthorized('Unauthorized. Invalid token.');
    }

    const user = result.data!;
    const model = userToModel(user);
    return Ok(model, 'I know who you are.');
  } catch (error: any) {
    return InternalServerError();
  }
});
