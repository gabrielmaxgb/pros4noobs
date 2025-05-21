import { defineEventHandler } from 'h3';
import {
  // type CreateUserDtoSchema as schema,
  type IUserModel,
  // type TUserRole,
  createUserSchema,
} from '~/shared/user';
import { parseAndValidate } from '~/server/utils/handlers';
import { UserService } from '~/server/core/user/userService';
import { userToModel } from '~/server/core/user/user';
import { container } from '~/server/core/container';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const [data, errors] = parseAndValidate(createUserSchema, body);

    if (errors) {
      return { status: 400, message: 'Invalid input', errors };
    }

    // Check if the user already exists
    const userService = container.get(UserService);
    const result = await userService.createUser(data);

    if (result.isFailure) {
      return { status: 400, message: result.error };
    }

    const newUser = result.data!;
    const model = userToModel(newUser);

    return { status: 201, message: 'User created successfully.', user: model };
  } catch (error: any) {
    return { status: 500, message: 'Internal server error.', error: error?.message };
  }
});
