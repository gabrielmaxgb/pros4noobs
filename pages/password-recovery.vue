<script setup lang="ts">
  import { z } from 'zod';

  definePageMeta({
    layout: false,
  });

  const passwordRecoveryFormSchema = z
    .object({
      email: z.string().email('Email inválido'),
      emailConfirmation: z.string().email('Email inválido'),
    })
    .superRefine((data, ctx) => {
      if (data.email !== data.emailConfirmation) {
        ctx.addIssue({
          code: 'custom',
          message: 'Os emails não coincidem',
          path: ['emailConfirmation'],
        });
      }
    });

  type TPasswordRecoveryForm = z.infer<typeof passwordRecoveryFormSchema>;

  const passwordRecoveryForm = ref<TPasswordRecoveryForm>({
    email: '',
    emailConfirmation: '',
  });

  const passwordRecoveryFormErrors = reactive<Partial<Record<keyof TPasswordRecoveryForm, string>>>(
    {}
  );

  const resetPasswordRecoveryFormErrors = () => {
    Object.keys(passwordRecoveryFormErrors).forEach((key) => {
      passwordRecoveryFormErrors[key as keyof TPasswordRecoveryForm] = '';
    });
  };

  const handleBackClick = () => {
    navigateTo({
      name: 'login',
    });
  };

  const handleSubmit = () => {
    resetPasswordRecoveryFormErrors();

    const result = passwordRecoveryFormSchema.safeParse(passwordRecoveryForm.value);

    if (!result.success) {
      result.error.errors.forEach((error) => {
        const key = error.path[0] as keyof TPasswordRecoveryForm;
        if (key) {
          passwordRecoveryFormErrors[key] = error.message;
        }
      });
      return false;
    }

    // TODO: Adds mutation function caller here
  };
</script>

<template>
  <Paper
    class="relative w-full h-[100vh] flex flex-col items-center justify-center bg-accented gap-6 py-20"
  >
    <UButton
      size="xl"
      class="absolute top-6 left-6 text-primary cursor-pointer"
      variant="soft"
      @click="handleBackClick"
    >
      <UIcon name="i-lucide:arrow-left" size="20" />
    </UButton>
    <div class="relative flex items-center justify-center">
      <div
        class="absolute size-28 rounded-full bg-warning/50 animate-pulse opacity-30 blur-xl scale-105"
      />

      <UIcon name="i-lucide:lock" size="80" class="relative z-10 text-warning scale-105" />
    </div>

    <h2 class="text-warning font-semibold text-xl mt-4"> Recuperação de senha </h2>

    <form
      class="w-full flex flex-col gap-4 max-w-[400px]"
      novalidate
      @submit.prevent="() => handleSubmit()"
    >
      <div class="flex flex-col">
        <UInput
          v-model="passwordRecoveryForm.email"
          label="Email"
          type="email"
          size="xl"
          :error="passwordRecoveryFormErrors.email"
          placeholder="Email"
          class="w-full"
        />
        <p v-if="passwordRecoveryFormErrors.email" class="text-red-500 text-sm mt-1">
          {{ passwordRecoveryFormErrors.email }}
        </p>
      </div>
      <div>
        <UInput
          v-model="passwordRecoveryForm.emailConfirmation"
          label="Confirme seu email"
          type="email"
          size="xl"
          :error="passwordRecoveryFormErrors.emailConfirmation"
          placeholder="Confirme seu email"
          class="w-full"
        />
        <p v-if="passwordRecoveryFormErrors.emailConfirmation" class="text-red-500 text-sm mt-1">
          {{ passwordRecoveryFormErrors.emailConfirmation }}
        </p>
      </div>
      <div class="w-full flex flex-col items-center justify-center mt-4 gap-2">
        <UButton
          type="submit"
          color="primary"
          :variant="passwordRecoveryFormErrors ? 'solid' : 'soft'"
          size="xl"
          :disabled="false"
          :loading="false"
          class="cursor-pointer w-full"
        >
          <span class="w-full"> Recuperar senha </span>
        </UButton>
      </div>
    </form>
  </Paper>
</template>
