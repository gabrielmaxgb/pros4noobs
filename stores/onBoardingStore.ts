import type { z as zType } from "zod";
import { z } from "zod";

export type IRegistrationForm = zType.infer<typeof registrationFormSchema>;

export const registrationFormSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  superBeginner: z.boolean(),
  areasOfInterest: z.array(z.string()).default([]),
  technologies: z.array(z.string()).default([]),
  startRole: z.enum(["noob", "pro"]),
});

const REGISTRATION_FORM_DEFAULT: IRegistrationForm = {
  name: "",
  email: "",
  superBeginner: false,
  areasOfInterest: [],
  technologies: [],
  startRole: "noob",
};

export const useOnBoardingStore = defineStore('onBoardingStore', () => {
  const registrationForm = reactive<IRegistrationForm>({
    name: "",
    email: "",
    superBeginner: false,
    areasOfInterest: [],
    technologies: [],
    startRole: "noob",
  });
  const registrationFormErrors = reactive<Partial<Record<keyof IRegistrationForm, string>>>({});

  const reset = () => {
    registrationForm.name = REGISTRATION_FORM_DEFAULT.name;
    registrationForm.email = REGISTRATION_FORM_DEFAULT.email;
    registrationForm.superBeginner = REGISTRATION_FORM_DEFAULT.superBeginner;
    registrationForm.areasOfInterest = REGISTRATION_FORM_DEFAULT.areasOfInterest;
    registrationForm.technologies = REGISTRATION_FORM_DEFAULT.technologies;
    registrationForm.startRole = REGISTRATION_FORM_DEFAULT.startRole;
  };

  return {registrationForm, registrationFormErrors, reset}
});