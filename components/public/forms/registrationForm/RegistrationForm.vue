<script setup lang="ts">
  import { markRaw } from 'vue';
  import UserInformation from './steps/UserInformation.vue';
  import Interests from './steps/Interests.client.vue';
  import Role from './steps/Role.vue';
  import Success from './steps/Success.vue';
  import type { StepperItem } from '@nuxt/ui';
  import { useOnboardingStore } from '~/stores/onboardingStore';
  import { createUserSchema } from '~/shared/user';
  import { base_createUserSchema } from '~/shared/user/createUserDto';
  import Password from './steps/Password.vue';

  interface StepperRef {
    next: () => void;
    prev: () => void;
    set: (step: number) => void;
    hasNext: Ref<boolean>;
    hasPrev: Ref<boolean>;
  }
  const stepperCurrent = useTemplateRef<StepperRef>('stepperCurrent');
  const onboardingStore = useOnboardingStore();
  const isFormSubmittionLoading = ref(false);
  const registrationFormStepperItems = ref<StepperItem[]>([
    {
      step: 0,
      nextStep: 1,
      description: 'Dados pessoais',
      icon: 'lucide:user',
      component: markRaw(UserInformation),
      backButtonLabel: 'Voltar',
      nextButtonLabel: 'Próximo',
    },
    {
      prevStep: 0,
      step: 1,
      nextStep: 2,
      description: 'Selecione seu papel',
      icon: 'lucide:briefcase',
      component: markRaw(Role),
      backButtonLabel: 'Voltar',
      nextButtonLabel: 'Próximo',
    },
    {
      prevStep: 1,
      step: 2,
      nextStep: 3,
      description: 'Tecnologias de interesse',
      icon: 'lucide:star',
      component: markRaw(Interests),
      backButtonLabel: 'Voltar',
      nextButtonLabel: 'Próximo',
    },
    {
      prevStep: 2,
      step: 3,
      nextStep: 4,
      description: 'Crie sua senha',
      icon: 'lucide:lock',
      value: 'password',
      component: markRaw(Password),
      backButtonLabel: 'Voltar',
      nextButtonLabel: 'Próximo',
    },
    {
      prevStep: 3,
      step: 4,
      description: 'Sucesso',
      icon: 'lucide:circle-check',
      component: markRaw(Success),
    },
  ]);

  const validatesRegistrationFormStep = (step: number) => {
    let validationSchema;
    switch (step) {
      case 0:
        validationSchema = base_createUserSchema.pick({ name: true, email: true });
        break;
      case 1:
        validationSchema = base_createUserSchema.pick({ startRole: true });
        break;
      case 2:
        validationSchema = base_createUserSchema.pick({
          technologies: true,
          startedAsSuperBeginner: true,
        });
        break;
      case 3:
        validationSchema = base_createUserSchema.pick({ password: true });
        break;
      default:
        validationSchema = createUserSchema;
    }

    const result = validationSchema.safeParse(onboardingStore.registrationForm);
    return result;
  };

  const isNextButtonDisabled = (step: number) => {
    const form = onboardingStore.registrationForm;

    switch (step) {
      case 0:
        return !form.name || !form.email;
      case 1:
        return !form.startRole;
      case 2:
        return (
          !form.startedAsSuperBeginner && (!form.technologies || form.technologies.length === 0)
        );
      case 3:
        return !form.password;
      default:
        return false;
    }
  };

  const handleNextStepClick = (item: StepperItem) => {
    onboardingStore.registrationFormErrors = {};
    const result = validatesRegistrationFormStep(item.step);

    if (result.success) {
      onboardingStore.registrationFormErrors = {};

      if (item.value === 'password') {
        handleSubmitRegistration();
      } else {
        stepperCurrent?.value?.next();
      }
    } else {
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof TRegistrationForm;
        onboardingStore.registrationFormErrors[field] = issue.message;
      });
      return;
    }
  };

  const handleRestartRegistrationFormClick = () => {
    onboardingStore.reset();
    registrationFormStepperItems.value.forEach(() => stepperCurrent.value?.prev());
  };

  const handleSubmitRegistration = async () => {
    try {
      // TODO: Implement form submission
      console.log('Submitting registration form:', onboardingStore.registrationForm);
      await Promise.resolve(); // Placeholder for API call
      stepperCurrent?.value?.next();
    } catch (error) {
      console.error('Failed to submit registration form:', error);
      // TODO: Add proper error handling
    } finally {
      isFormSubmittionLoading.value = false;
    }
  };

  onBeforeUnmount(() => {
    onboardingStore.registrationFormErrors = {};
    onboardingStore.reset();
  });
</script>

<template>
  <!-- onBoadingStore: {{ onboardingStore.registrationForm }}<br />
  onBoadingStoreErrors: {{ onboardingStore.registrationFormErrors }}<br /> -->
  <form class="w-full flex flex-col" novalidate @submit.prevent="handleSubmitRegistration">
    <UStepper
      :ref="'stepperCurrent'"
      :items="registrationFormStepperItems"
      size="md"
      :disabled="true"
      class="w-full"
    >
      <template #content="{ item }">
        <div class="w-full flex items-start justify-center mt-0">
          <div class="w-full flex flex-col gap-6 pt-0">
            <component :is="item.component" />
            <div
              v-if="stepperCurrent?.hasNext"
              class="w-full flex items-center justify-end gap-2 mt-4"
            >
              <UButton
                v-if="stepperCurrent?.hasPrev"
                class="cursor-pointer text-base"
                color="primary"
                :variant="stepperCurrent?.hasPrev ? 'link' : 'solid'"
                size="xl"
                @click="stepperCurrent?.prev"
              >
                {{ item.backButtonLabel }}
              </UButton>
              <UButton
                class="cursor-pointer text-base"
                color="primary"
                :variant="isNextButtonDisabled(item.step) ? 'link' : 'solid'"
                size="xl"
                :disabled="isNextButtonDisabled(item.step)"
                @click="handleNextStepClick(item)"
              >
                {{ item.nextButtonLabel }}
              </UButton>
            </div>
            <div v-else>
              <UButton
                class="cursor-pointer text-base"
                color="primary"
                :variant="'soft'"
                size="xl"
                @click="handleRestartRegistrationFormClick"
              >
                <UIcon name="ic:baseline-refresh" class="text-white text-2xl" />
              </UButton>
            </div>
          </div>
        </div>
      </template>
    </UStepper>
  </form>
</template>
