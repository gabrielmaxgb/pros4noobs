import User from '../../models/user';
import { defineEventHandler, readBody } from 'h3';
import GeneralConfiguration from '~/server/models/configurations';
import {
  type TCreateUser_DTO,
  // type CreateUserDtoSchema as schema,
  type IUserModel,
  // type TUserRole,
  createUserSchema,
} from '~/shared/user';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    // Validate the request body against the schema
    const parsedBody = createUserSchema.safeParse(body);
    if (!parsedBody.success) {
      return { status: 400, message: 'Invalid input', errors: parsedBody.error.errors };
    }

    // Extract the validated data
    const data = parsedBody.data as TCreateUser_DTO;

    // Check if the user already exists
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return { status: 400, message: 'User already exists.' };
    }

    const techsConfig = await GeneralConfiguration.findOne({
      key: 'technologies',
    });

    const techs = techsConfig?.value?.split(',').map((tech: string) => tech.trim()) || [];

    if (!data.technologies.every((tech) => techs.includes(tech))) {
      return { status: 400, message: 'Invalid technology selected.' };
    }

    // Create a new user
    const newUser = new User({
      name: data.name,
      email: data.email,
      password: data.password, // Note: Hash the password in production
      technologies: data.technologies,
      // initialRoles: body.initialRoles,
      initialRole: data.startRole,
      startedAsSuperBeginner: data.startedAsSuperBeginner,
    });

    await newUser.save();

    const model: IUserModel = {
      id: newUser._id.toString(),
      name: newUser.name,
      email: newUser.email,
      technologies: newUser.technologies,
      initialRole: newUser.initialRole,
      superNoob: newUser.startedAsSuperBeginner,
      // initialRoles: newUser.initialRoles.map((role: string) => role as UserRole),
    };

    return { status: 201, message: 'User created successfully.', user: newUser };
  } catch (error: any) {
    return { status: 500, message: 'Internal server error.', error: error?.message };
  }
});
