import { createQueryKeys } from '@lukemorales/query-key-factory';
import { getUserRegistrationTechnologies } from '~/setApi/publicApi';

export const user = createQueryKeys('user', {
  getUserRegistrationTechnologies: () => ({
    queryKey: ['technologies'],
    queryFn: getUserRegistrationTechnologies,
  }),
});
