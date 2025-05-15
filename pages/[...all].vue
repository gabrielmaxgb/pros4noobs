<script setup lang="ts"></script>

<template>
  <div class="text-center mt-20 flex flex-col justify-start items-center">
    <h1 class="text-3xl font-header text-primary">
      Sem rumo, até 404 vira página inicial
    </h1>
    <p>Participe do nosso programa de mentoria!</p>
    <UIcon name="tabler:ghost-2-filled" size="100" class="my-6" />
    <NuxtLink to="/" class="mt-4 inline-block text-primary hover:underline">
      <UButton
        class="cursor-pointer text-base"
        variant="subtle"
        color="primary"
      >
        Voltar para o Início
      </UButton>
    </NuxtLink>
  </div>
</template>
