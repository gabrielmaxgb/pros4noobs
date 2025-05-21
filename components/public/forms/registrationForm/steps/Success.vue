<script setup lang="ts"></script>

<template>
  <div class="w-full flex flex-col items-center justify-center gap-4 pt-4">
    <UIcon name="icon-park-outline:fireworks" class="text-primary text-8xl" />
    <h2 class="text-lg mb-6">
      Bem vindo(a) a <span class="text-primary font-semibold">Pros4Noobs</span>!
    </h2>
    <p class="text-center text-lg">
      Esperamos que você tenha uma ótima experiência na nossa plataforma e que sua jornada seja
      repleta de aprendizado e crescimento.
    </p>
    <UButton
      class="cursor-pointer"
      size="xl"
      color="primary"
      variant="soft"
      @click="navigateTo({ name: 'login' })"
    >
      Entrar
    </UButton>
  </div>
</template>
