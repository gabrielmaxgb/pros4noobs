<script setup lang="ts">
const onBoardingStore = useOnBoardingStore();
</script>

<template>
  <div>
    <UInput
      v-model="onBoardingStore.registrationForm.name"
      type="text"
      placeholder="Nome Completo"
      variant="soft"
      class="w-full"
      size="xl"
    />
    <p
      v-if="onBoardingStore.registrationFormErrors.name"
      class="text-red-500 text-sm mt-1"
    >
      {{ onBoardingStore.registrationFormErrors.name }}
    </p>
  </div>

  <div>
    <UInput
      v-model="onBoardingStore.registrationForm.email"
      type="text"
      placeholder="Email"
      variant="soft"
      class="w-full"
      size="xl"
    />
    <p
      v-if="onBoardingStore.registrationFormErrors.email"
      class="text-red-500 text-sm mt-1"
    >
      {{ onBoardingStore.registrationFormErrors.email }}
    </p>
  </div>
</template>
