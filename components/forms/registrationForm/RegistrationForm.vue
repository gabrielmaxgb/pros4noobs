<script setup lang="ts">
  import { markRaw } from 'vue';
  import UserInformation from './steps/UserInformation.vue';
  import Interests from './steps/Interests.vue';
  import Role from './steps/Role.vue';
  import Success from './steps/Success.vue';
  import type { StepperItem } from '@nuxt/ui';
  import { useOnBoardingStore } from '~/stores/onBoardingStore';

  interface StepperRef {
    next: () => void;
    prev: () => void;
    set: (step: number) => void;
    hasNext: Ref<boolean>;
    hasPrev: Ref<boolean>;
  }
  const stepperCurrent = useTemplateRef<StepperRef>('stepperCurrent');
  const onBoardingStore = useOnBoardingStore();
  const isFormSubmittionLoading = ref(false);
  const registrationFormStepperItems = ref<StepperItem[]>([
    {
      step: 1,
      nextStep: 2,
      // title: "Dados pessoais",
      description: 'Dados pessoais',
      icon: 'i-lucide-user',
      component: markRaw(UserInformation),
      backButtonLabel: 'Voltar',
      nextButtonLabel: 'Próximo',
    },
    {
      prevStep: 1,
      step: 2,
      nextStep: 3,
      // title: "Selecione seu papel",
      description: 'Selecione seu papel',
      icon: 'i-lucide-briefcase',
      component: markRaw(Role),
      backButtonLabel: 'Voltar',
      nextButtonLabel: 'Próximo',
    },
    {
      prevStep: 2,
      step: 3,
      nextStep: 4,
      // title: "Tecnologias de interesse",
      description: 'Tecnologias de interesse',
      icon: 'i-lucide-star',
      component: markRaw(Interests),
      backButtonLabel: 'Voltar',
      nextButtonLabel: 'Concluir',
    },
    {
      prevStep: 3,
      step: 4,
      // title: "Sucesso",
      description: 'Sucesso',
      icon: 'i-lucide-check-circle',
      component: markRaw(Success),
    },
  ]);

  const isBackButtonDisabled = computed(() => {
    return !stepperCurrent?.value?.hasPrev;
  });

  const isNextButtonDisabled = (currentStep: number) => {
    if (!stepperCurrent?.value?.hasNext) {
      return true;
    }
    const form = onBoardingStore.registrationForm;

    switch (currentStep) {
      case 1:
        return !(form.name && form.email);
      case 2:
        return !form.startRole;
      case 3:
        return form.superBeginner
          ? false
          : !(form.technologies.length > 0 && form.areasOfInterest.length > 0);
      default:
        return false;
    }
  };

  const handleNextStepClick = (item: StepperItem) => {
    const result = registrationFormSchema.safeParse(onBoardingStore.registrationForm);

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof IRegistrationForm;
        onBoardingStore.registrationFormErrors[field] = issue.message;
      });
      return;
    }

    onBoardingStore.registrationFormErrors = {};

    if (item.step === registrationFormStepperItems.value.length - 1) {
      handleSubmitRegistration();
    } else {
      stepperCurrent?.value?.next();
    }
  };

  const handleRestartRegistrationFormClick = () => {
    onBoardingStore.reset();
    registrationFormStepperItems.value.forEach(() => stepperCurrent.value?.prev());
  };

  const handleSubmitRegistration = async () => {
    try {
      // TODO: Implement form submission
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
    onBoardingStore.registrationFormErrors = {};
    onBoardingStore.reset();
  });
</script>

<template>
  <!-- onBoadingStore: {{ onBoardingStore.registrationForm }}<br />
  onBoadingStoreErrors: {{ onBoardingStore.registrationFormErrors }}<br /> -->
  <form class="w-full flex flex-col" @submit.prevent="handleSubmitRegistration">
    <UStepper
      :ref="'stepperCurrent'"
      :items="registrationFormStepperItems"
      size="lg"
      :disabled="true"
      class="w-full"
    >
      <template #content="{ item }">
        <div class="w-full flex items-start justify-center mt-4">
          <div class="w-full flex flex-col gap-6 pt-6">
            <component :is="item.component" />
            <div
              v-if="stepperCurrent?.hasNext"
              class="w-full flex items-center justify-between mt-4"
            >
              <UButton
                class="cursor-pointer text-base"
                color="primary"
                :variant="isBackButtonDisabled ? 'link' : 'solid'"
                size="xl"
                :disabled="isBackButtonDisabled"
                @click="stepperCurrent?.prev"
              >
                {{ item.backButtonLabel }}
              </UButton>
              <!-- item.step: {{ item.step }}<br /> -->
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
