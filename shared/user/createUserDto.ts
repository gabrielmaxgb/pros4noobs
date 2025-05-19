import { z } from 'zod';
import { USER_ROLES } from './userModel';

export const userRoleSchema = z.enum(USER_ROLES);

export const base_createUserSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido').trim(),
  startedAsSuperBeginner: z.boolean().default(false),
  technologies: z.array(z.string()).default([]),
  password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres'),
  startRole: userRoleSchema.default('noob'),
});

export const createUserSchema = base_createUserSchema.refine(
  (data) => data.startedAsSuperBeginner || (data.technologies && data.technologies.length > 0),
  {
    message: 'Selecione ao menos uma tecnologia ou marque como super iniciante.',
    path: ['technologies'],
  }
);

export type TCreateUser_DTO = z.infer<typeof createUserSchema>;
