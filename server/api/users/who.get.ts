import {
  Ok,
  Unauthorized,
} from '~/server/utils/response';
import { userToModel } from '~/server/core/user/user';
import { useScope } from '~/server/core/container';
import { LoginService } from '~/server/core/auth/loginService';
import { defineSafeHandler } from '~/server/utils/handlers';

export default defineSafeHandler(async (event) => {
  const token = getCookie(event, 'token');
  if (!token) {
    return Unauthorized('Unauthorized. No token provided.');
  }

  const scope = useScope();
  const loginService = await scope.get(LoginService);
  const result = await loginService.getUserFromToken(token);

  if (result.isFailure) {
    return Unauthorized('Unauthorized. Invalid token.');
  }

  const model = userToModel(result.data!);
  return Ok(model, 'I know who you are.');
});
