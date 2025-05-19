<script setup lang="ts">
  const onboardingStore = useOnboardingStore();
  const show = ref(false);
</script>

<template>
  <div>
    <!-- <UInput
      v-model="onboardingStore.registrationForm.password"
      type="text"
      placeholder="Nome Completo"
      variant="soft"
      class="w-full"
      size="xl"
    />
     -->

    <UInput
      v-model="onboardingStore.registrationForm.password"
      placeholder="Senha"
      :type="!show ? 'text' : 'password'"
      :ui="{ trailing: 'pe-1' }"
      variant="soft"
      class="w-full"
      size="xl"
    >
      <template #trailing>
        <UButton
          color="primary"
          variant="link"
          size="xl"
          :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
          :aria-label="!show ? 'Hide password' : 'Show password'"
          :aria-pressed="!show"
          aria-controls="password"
          @click="show = !show"
        />
      </template>
    </UInput>
    <p v-if="onboardingStore.registrationFormErrors.password" class="text-red-500 text-sm mt-1">
      {{ onboardingStore.registrationFormErrors.password }}
    </p>
  </div>

  <!-- <div>
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
  </div> -->
</template>
