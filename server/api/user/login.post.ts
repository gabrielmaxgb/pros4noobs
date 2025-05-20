import { defineEventHandler, readBody } from 'h3';
import {
  loginDtoSchema,
} from '~/shared/user';
import { parseAndValidate } from '~/server/utils/handlers';
import { LoginService } from '~/server/core/auth/loginService';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const [data, errors] = parseAndValidate(loginDtoSchema, body);
    
    if (errors) {
      return { status: 400, message: 'Invalid input', errors };
    }
    
    const loginService = LoginService.getInstance();
    const result = await loginService.login(event, data);

    if (result.isFailure) {
      return { status: 400, message: result.error };
    }

    const model = result.data!;

    return { status: 201, message: 'Logged in successfully.', user: model };
  } catch (error: any) {
    return { status: 500, message: 'Internal server error.', error: error?.message };
  }
});
