import type { z as zType } from 'zod';
import type { createUserSchema } from '~/shared/user/createUserDto';

export type TRegistrationForm = zType.infer<typeof createUserSchema>;

const REGISTRATION_FORM_DEFAULT: TRegistrationForm = {
  name: '',
  email: '',
  startedAsSuperBeginner: false,
  technologies: [],
  password: '',
  startRole: 'noob',
};

export const useOnboardingStore = defineStore('onboardingStore', () => {
  const registrationForm = reactive<TRegistrationForm>({
    name: '',
    email: '',
    startedAsSuperBeginner: false,
    technologies: [],
    password: '',
    startRole: 'noob',
  });
  const registrationFormErrors = reactive<Partial<Record<keyof TRegistrationForm, string>>>({});

  const reset = () => {
    registrationForm.name = REGISTRATION_FORM_DEFAULT.name;
    registrationForm.email = REGISTRATION_FORM_DEFAULT.email;
    registrationForm.startedAsSuperBeginner = REGISTRATION_FORM_DEFAULT.startedAsSuperBeginner;
    registrationForm.technologies = REGISTRATION_FORM_DEFAULT.technologies;
    registrationForm.password = REGISTRATION_FORM_DEFAULT.password;
    registrationForm.startRole = REGISTRATION_FORM_DEFAULT.startRole;
  };

  return { registrationForm, registrationFormErrors, reset };
});
