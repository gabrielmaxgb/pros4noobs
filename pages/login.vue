<script setup lang="ts">
  import Paper from '~/components/Paper.vue';
  import type { z as zType } from 'zod';
  import { z } from 'zod';

  type TLoginForm = zType.infer<typeof loginFormSchema>;

  const loginFormErrors = reactive<Partial<Record<keyof TLoginForm, string>>>({});
  const loginForm = ref<TLoginForm>({
    email: '',
    password: '',
  });
  const loginFormSchema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres' }),
  });

  const resetLoginFormErrors = () => {
    Object.keys(loginFormErrors).forEach((key) => {
      loginFormErrors[key as keyof TLoginForm] = '';
    });
  };

  const validateLoginForm = () => {
    console.log(loginForm.value); // Verifique os dados do formulário
    resetLoginFormErrors(); // Limpa erros antes de atribuir novos

    const result = loginFormSchema.safeParse(loginForm.value);
    console.log(result);

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
  // const validateLoginForm = () => {
  //   const result = loginFormSchema.safeParse(loginForm.value);
  //   console.log(result);
  //   if (!result.success) {
  //     result.error.errors.forEach((error) => {
  //       loginFormErrors[error.path[0] as keyof TLoginForm] = error.message;
  //     });
  //     return false;
  //   }
  //   resetLoginFormErrors();
  //   return true;
  // };
</script>

<template>
  <div class="w-full flex items-start justify-center pt-4 md:pt-24">
    <section class="w-11/12 md:w-10/12">
      <!-- {{ loginForm }}<br />
      {{ loginFormErrors }}<br /> -->
      <Paper class="flex flex-col items-center gap-6 bg-secondary/10 py-20">
        <!-- <UIcon
          name="icon-park-outline:face-with-smiling-open-eyes"
          class="text-5xl text-primary cursor-pointer"
        />
        <UIcon
          name="icon-park-outline:grinning-face-with-tightly-closed-eyes"
          class="text-5xl text-primary cursor-pointer"
        /> -->
        <div class="w-full flex items-center justify-center">
          <img src="/public/p4n-logo.svg" class="size-24 mr-2" />
        </div>
        <div class="w-full flex items-center justify-center">
          <p class="text-lg text-primary font-semibold text-center"
            >Bem vindo(a) de volta! <br />Faça o login para continuar</p
          >
        </div>
        <form
          class="w-full flex flex-col gap-4 max-w-[400px]"
          novalidate
          @submit.prevent="() => validateLoginForm()"
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
              label="Senha"
              type="password"
              size="xl"
              :error="loginFormErrors.password"
              placeholder="Enter your password"
              class="w-full"
            />
            <p v-if="loginFormErrors.password" class="text-red-500 text-sm mt-1">
              {{ loginFormErrors.password }}
            </p>
          </div>
          <div class="w-full">
            <UButton
              type="submit"
              color="primary"
              :variant="loginFormErrors ? 'solid' : 'soft'"
              size="xl"
              class="w-full text-center"
            >
              Login
            </UButton>
          </div>
        </form>
      </Paper>
    </section>
  </div>
</template>
