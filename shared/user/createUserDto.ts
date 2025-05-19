import { z } from 'zod';
import { USER_ROLES } from './userModel';

export const userRoleSchema = z.enum(USER_ROLES);

// Define a schema for user creation
export const createUserSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido').trim(),
  startedAsSuperBeginner: z.boolean().default(false),
  technologies: z.array(z.string()).default([]),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  startRole: userRoleSchema,
});

export type TCreateUser_DTO = z.infer<typeof createUserSchema>;
