<script setup lang="ts">
  definePageMeta({
    layout: false,
  });

  const handleBackClick = () => {
    const isAuthenticated = () => {
      return true;
    };

    if (!isAuthenticated()) {
      navigateTo({ name: `login` });
    } else {
      navigateTo({ name: 'user-userId-dashboard', params: { userId: 123 } });
    }
  };
</script>

<template>
  <div class="text-center mt-20 flex flex-col justify-start items-center">
    <h1 class="text-3xl font-header text-primary">Sem rumo, até 404 vira página inicial</h1>
    <p>Participe do nosso programa de mentoria!</p>
    <UIcon name="tabler:ghost-2-filled" size="100" class="my-6" />
    <UButton
      class="cursor-pointer text-base"
      variant="subtle"
      color="primary"
      @click="() => handleBackClick()"
    >
      Voltar para o Início
    </UButton>
  </div>
</template>
