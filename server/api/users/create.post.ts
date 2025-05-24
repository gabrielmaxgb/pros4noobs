import User from '../../models/user';
import { defineEventHandler, readBody, setResponseStatus } from 'h3';
import GeneralConfiguration from '~/server/models/configurations';
import { type TCreateUser_DTO, type IUserModel, createUserSchema } from '~/shared/user';
import * as argon2 from 'argon2';
import { Created, BadRequest, InternalServerError } from '~/server/utils/response';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    // Validate the request body against the schema
    const parsedBody = createUserSchema.safeParse(body);
    if (!parsedBody.success) {
      return BadRequest(event, 'Invalid input');
    }

    // Extract the validated data
    const data = parsedBody.data as TCreateUser_DTO;

    // Check if the user already exists
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return BadRequest(event, 'User already exists.');
    }

    const techsConfig = await GeneralConfiguration.findOne({
      key: 'technologies',
    });

    const techs = techsConfig?.value?.split(',').map((tech: string) => tech.trim()) || [];

    if (!data.technologies.every((tech) => techs.includes(tech))) {
      return BadRequest(event, 'Invalid technology selected.');
    }

    const passwordHash = await argon2.hash(data.password, {
      type: argon2.argon2id, // Uses Argon2id for resistance to side-channel attacks
      memoryCost: 2 ** 16,   // 64 MB of memory (standard for Argon2)
      timeCost: 3,           // Iterations (3 is generally considered secure)
      parallelism: 1,        // Number of threads (1 for server-side hashing)
      hashLength: 32,        // Length of the resulting hash
    });

    // Create a new user
    const newUser = new User({
      name: data.name,
      email: data.email,
      password: data.password, // Note: Hash the password in production
      passwordHash: passwordHash,
      technologies: data.technologies,
      initialRole: data.startRole,
      startedAsSuperBeginner: data.startedAsSuperBeginner,
      roles: [data.startRole],
    });

    await newUser.save();

    const model: IUserModel = {
      id: newUser._id.toString(),
      name: newUser.name,
      email: newUser.email,
      technologies: newUser.technologies,
      initialRole: newUser.initialRole,
      startedAsSuperBeginner: newUser.startedAsSuperBeginner,
      roles: newUser.roles.map((role: string) => role as 'noob' | 'pro'),
    };

    return Created(event, model, 'User created successfully.');
  } catch (error: any) {
    return InternalServerError(event, 'Internal server error.');
  }
});
