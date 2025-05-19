<script setup lang="ts">
  const onboardingStore = useOnboardingStore();
</script>

<template>
  <div>
    <UInput
      v-model="onboardingStore.registrationForm.name"
      type="text"
      placeholder="Nome Completo"
      variant="soft"
      class="w-full"
      size="xl"
    />
    <p v-if="onboardingStore.registrationFormErrors.name" class="text-red-500 text-sm mt-1">
      {{ onboardingStore.registrationFormErrors.name }}
    </p>
  </div>

  <div>
    <UInput
      v-model="onboardingStore.registrationForm.email"
      type="text"
      placeholder="Email"
      variant="soft"
      class="w-full"
      size="xl"
    />
    <p v-if="onboardingStore.registrationFormErrors.email" class="text-red-500 text-sm mt-1">
      {{ onboardingStore.registrationFormErrors.email }}
    </p>
  </div>
</template>
