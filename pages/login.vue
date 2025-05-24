<script setup lang="ts">
  import { useMutation } from '@tanstack/vue-query';
  import type { z as zType } from 'zod';
  import { z } from 'zod';
  import { login } from '~/setApi/authApi';
  import type { IUserModel } from '~/shared/user';

  definePageMeta({
    layout: false,
    middleware: 'redirect-if-authenticated',
  });

  export type TLoginForm = zType.infer<typeof loginFormSchema>;

  const showPassword = ref(false);
  const session = useSession();
  const loginFormErrors = reactive<Partial<Record<keyof TLoginForm, string>>>({});
  const loginForm = ref<TLoginForm>({
    email: '',
    password: '',
  });
  const loginFormSchema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres' }),
  });

  const { mutate: loginMutation, isPending: isLoginMutationPending } = useMutation({
    mutationFn: () => login(loginForm.value),
    onSuccess: async (data: IUserModel) => {
      session.setSession(data);
      navigateTo({
        name: 'user-userId-dashboard',
        params: { userId: data.id },
      });
    },
    onError: (error) => {
      console.error('Erro ao fazer login:', error);
    },
  });

  const resetLoginFormErrors = () => {
    Object.keys(loginFormErrors).forEach((key) => {
      loginFormErrors[key as keyof TLoginForm] = '';
    });
  };

  const validateLoginForm = () => {
    resetLoginFormErrors();

    const result = loginFormSchema.safeParse(loginForm.value);

    if (!result.success) {
      result.error.errors.forEach((error) => {
        const key = error.path[0] as keyof TLoginForm;
        if (key) {
          loginFormErrors[key] = error.message;
        }
      });
      return false;
    }

    return true;
  };

  const handleBackClick = () => {
    navigateTo({ name: 'index' });
  };

  const handleSubmitLogin = async () => {
    if (validateLoginForm()) {
      loginMutation();
    } else {
      return;
    }
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
        class="absolute size-28 rounded-full bg-neutral-400/50 opacity-30 blur-xl animate-pulse scale-105"
      />

      <img src="/public/p4n-logo.svg" class="relative z-10 size-24" alt="Logo P4N" />
    </div>

    <div class="w-full flex items-center justify-center">
      <p class="text-lg text-primary font-semibold text-center">
        Bem vindo(a) de volta! <br />Faça o login para continuar
      </p>
    </div>
    <form
      class="w-full flex flex-col gap-4 max-w-[400px]"
      novalidate
      @submit.prevent="() => handleSubmitLogin()"
    >
      <div class="flex flex-col">
        <UInput
          v-model="loginForm.email"
          label="Email"
          type="email"
          size="xl"
          :error="loginFormErrors.email"
          placeholder="Email"
          class="w-full"
        />
        <p v-if="loginFormErrors.email" class="text-red-500 text-sm mt-1">
          {{ loginFormErrors.email }}
        </p>
      </div>
      <div>
        <UInput
          v-model="loginForm.password"
          placeholder="Senha"
          :type="showPassword ? 'text' : 'password'"
          class="w-full"
          size="xl"
          :aria-invalid="loginFormErrors.password ? 'true' : 'false'"
          :ui="{ trailing: 'pe-1' }"
        >
          <template #trailing>
            <UButton
              color="neutral"
              variant="link"
              size="xl"
              :icon="!showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
              :aria-label="showPassword ? 'Esconder' : 'Mostrar'"
              :aria-pressed="showPassword"
              aria-controls="password"
              @click="showPassword = !showPassword"
            />
          </template>
        </UInput>
        <p v-if="loginFormErrors.password" class="text-red-500 text-sm mt-1">
          {{ loginFormErrors.password }}
        </p>
      </div>
      <div class="w-full flex flex-col items-center justify-center mt-4 gap-2">
        <UButton
          type="submit"
          color="primary"
          :variant="loginFormErrors ? 'solid' : 'soft'"
          size="xl"
          :disabled="isLoginMutationPending"
          :loading="isLoginMutationPending"
          class="cursor-pointer w-full"
        >
          <span class="w-full"> Entrar </span>
        </UButton>
      </div>
    </form>
    <UButton
      type="button"
      color="warning"
      :variant="'link'"
      size="md"
      class="max-w-fit cursor-pointer"
      @click="navigateTo({ name: 'password-recovery' })"
    >
      Esqueci a senha
    </UButton>
  </Paper>
</template>
