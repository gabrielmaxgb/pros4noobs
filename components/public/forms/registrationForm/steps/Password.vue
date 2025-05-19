<script setup lang="ts">
  const onboardingStore = useOnboardingStore();
  const showPassword = ref(false);
</script>

<template>
  <div>
    <UInput
      v-model="onboardingStore.registrationForm.password"
      placeholder="Senha"
      :type="showPassword ? 'text' : 'password'"
      class="w-full"
      size="xl"
      :aria-invalid="onboardingStore.registrationFormErrors.password ? 'true' : 'false'"
      :ui="{ trailing: 'pe-1' }"
    >
      <template #trailing>
        <UButton
          color="neutral"
          variant="link"
          size="sm"
          :icon="!showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
          :aria-label="showPassword ? 'Esconder' : 'Mostrar'"
          :aria-pressed="showPassword"
          aria-controls="password"
          @click="showPassword = !showPassword"
        />
      </template>
    </UInput>
    <p v-if="onboardingStore.registrationFormErrors.password" class="text-red-500 text-sm mt-1">
      {{ onboardingStore.registrationFormErrors.password }}
    </p>

    <!-- <UInput
      v-model="onboardingStore.registrationForm.name"
      type="password"
      placeholder="Nome Completo"
      variant="soft"
      class="w-full"
      size="xl"
    />
    <p v-if="onboardingStore.registrationFormErrors.name" class="text-red-500 text-sm mt-1">
      {{ onboardingStore.registrationFormErrors.name }}
    </p> -->
  </div>
</template>
