import { defineSafeHandler, useBodyWithSchema as useBodySchemaAsync } from '~/server/utils/handlers';
import { UserService } from '~/server/core/user/userService';
import { userToModel } from '~/server/core/user/user';
import { useScope } from '~/server/core/container';
import { createUserSchema } from '~/shared/user';
import { Created, BadRequest, InternalServerError } from '~/server/utils/response';

export default defineSafeHandler(async (event) => {
  const [data, errors] = await useBodySchemaAsync(createUserSchema);

  if (errors) {
    return BadRequest('Invalid input');
  }

  const scope = useScope();
  const userService = scope.get(UserService);
  const result = await userService.createUser(data);

  if (result.isFailure) {
    return BadRequest(result.error);
  }

  const model = userToModel(result.data!);

  return Created(model, 'User created successfully.');
});
