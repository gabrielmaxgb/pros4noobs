import { createQueryKeys } from '@lukemorales/query-key-factory';
import { getUserRegistrationTechnologies } from '~/api/publicApi';

export const user = createQueryKeys('user', {
  getUserRegistrationTechnologies: () => ({
    queryKey: ['technologies'],
    queryFn: getUserRegistrationTechnologies,
  }),
});
