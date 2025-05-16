import { z } from 'zod';

const UserRoleSchema = z.enum(['noob', 'pro']);

// Define a schema for user creation
const CreateUserDtoSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  technologies: z.array(z.string()).min(1, 'At least one technology is required'),
  initialRoles: z.array(UserRoleSchema).min(1, 'At least one role is required'),
});

type CreateUserDto = z.infer<typeof CreateUserDtoSchema>;

export type { CreateUserDto };
export { CreateUserDtoSchema };
