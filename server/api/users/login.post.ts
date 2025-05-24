import { defineEventHandler, readBody, setCookie } from 'h3';
import { generateToken } from '~/server/core/auth/tokens';
import { loginDtoSchema } from '~/shared/user/loginDto';
import { Ok, NotFound, BadRequest, InternalServerError } from '~/server/utils/response';
import { useScope } from '~/server/core/container';
import { LoginService } from '~/server/core/auth/loginService';
import { userToModel } from '~/server/core/user/user';
import { defineSafeHandler, useBodyWithSchema } from '~/server/utils/handlers';

export default defineSafeHandler(async (event) => {
  const [data, errors] = await useBodyWithSchema(loginDtoSchema);

  if (errors) {
    return BadRequest('Invalid input');
  }

  const scope = useScope();
  const loginService = scope.get(LoginService);
  const result = await loginService.login(event, data);

  if (result.isFailure) {
    return NotFound(result.error);
  }

  const model = userToModel(result.data!);

  const token = generateToken(model.id);
  setCookie(event, 'token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax', // funciona perfeito no mesmo domínio (localhost ou Vercel fullstack)
    path: '/',
    maxAge: 60 * 60 * 24, // 1 dia
  });

  return Ok(model, 'Logged in successfully.');
});
