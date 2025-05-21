<script setup lang="ts">
  definePageMeta({
    layout: false,
  });

  const handleBackClick = () => {
    const isAuthenticated = () => {
      return false;
    };

    if (isAuthenticated()) {
      navigateTo({ name: 'user-userId-dashboard', params: { userId: 123 } });
    } else {
      navigateTo({ name: `login` });
    }
  };
</script>

<template>
  <div
    class="text-center h-[100vh] flex flex-col justify-center items-center bg-gradient-to-br from-primary/40 via-black to-secondary/20"
  >
    <h1 class="text-3xl font-header text-primary">Sem rumo, até 404 vira página inicial</h1>
    <p>Participe do nosso programa de mentoria!</p>
    <UIcon name="mynaui:daze-ghost-solid" size="100" class="my-6 text-primary" />
    <UButton
      class="cursor-pointer text-base"
      variant="subtle"
      color="primary"
      @click="() => handleBackClick()"
    >
      Salve-me!
      <!-- <UIcon name="emojione-monotone:face-screaming-in-fear" size="20" class="ml-2 text-primary" /> -->
    </UButton>
  </div>
</template>
