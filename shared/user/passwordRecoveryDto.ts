import { z } from 'zod';

export const passwordRecoveryDtoSchema = z.object({
  email: z.string().email(),
});

export type PasswordRecoveryDto = z.infer<typeof passwordRecoveryDtoSchema>;
