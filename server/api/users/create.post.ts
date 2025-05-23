import { parseAndValidate } from '~/server/utils/handlers';
import { UserService } from '~/server/core/user/userService';
import { userToModel } from '~/server/core/user/user';
import { useScope } from '~/server/core/container';
import { defineEventHandler, readBody } from 'h3';
import { createUserSchema } from '~/shared/user';
import { Created, BadRequest, InternalServerError } from '~/server/utils/response';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const [data, errors] = parseAndValidate(createUserSchema, body);

    if (errors) {
      return BadRequest(event, 'Invalid input');
    }

    const scope = useScope();
    const userService = scope.get(UserService);
    const result = await userService.createUser(data);

    if (result.isFailure) {
      return BadRequest(event, result.error);
    }

    const model = userToModel(result.data!);

    return Created(event, model, 'User created successfully.');
  } catch (error: any) {
    return InternalServerError(event, 'Internal server error.');
  }
});
