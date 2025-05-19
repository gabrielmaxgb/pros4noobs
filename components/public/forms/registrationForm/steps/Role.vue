<script setup lang="ts">
  import type { RadioGroupItem } from '@nuxt/ui';

  const onboardingStore = useOnboardingStore();
  const startRoleItems = ref<RadioGroupItem[]>([
    {
      label: 'Pro',
      value: 'pro',
      description:
        'Já trabalho com tecnologia e quero dedicar um pouco do meu tempo para ajudar quem está começando. Ao me cadastrar como pro, posso ser conectado com noobs que precisam de orientação, compartilhando conhecimento de forma voluntária, responsável e acolhedora.',
    },
    {
      label: 'Noob',
      value: 'noob',
      description:
        'Sou iniciante em tecnologia e gostaria de ser orientado por alguém mais experiente. Ao me cadastrar como noob, poderei ser conectado com um mentor que vai me ajudar a entender melhor a área, tirar dúvidas e me dar direção para começar minha jornada.',
    },
  ]);
</script>

<template>
  <div>
    <URadioGroup
      v-model="onboardingStore.registrationForm.startRole"
      color="primary"
      default-value="pro"
      orientation="horizontal"
      :variant="'card'"
      :items="startRoleItems"
      :size="'lg'"
      class="!cursor-pointer"
    />
    <p v-if="onboardingStore.registrationFormErrors.startRole" class="text-red-500 text-sm mt-1">
      {{ onboardingStore.registrationFormErrors.startRole }}
    </p>
  </div>
</template>
