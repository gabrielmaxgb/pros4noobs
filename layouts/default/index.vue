<script setup lang="ts">
  import { TOP_NAVBAR_HEIGHT } from '~/constants';

  const toast = useToast();

  function showToast() {
    toast.add({
      title: 'A Pros4Noobs está chegando!',
      description: 'Estamos nos preparando para dar início às nossas atividades! Fique ligado!',
      orientation: 'vertical',
      color: 'primary',
      duration: 5000,
      ui: {
        root: 'bg-internal-black border-[0] border-primary',
        progress: '',
      },
      actions: [
        // {
        //   icon: 'i-lucide-refresh-cw',
        //   label: 'Retry',
        //   color: 'neutral',
        //   variant: 'outline',
        //   onClick: (e) => {
        //     e?.stopPropagation();
        //   },
        // },
      ],
    });
  }
</script>

<template>
  <div
    class="w-full h-[100vh] relative bg-gradient-to-br from-primary/40 via-black to-secondary/20"
  >
    <div
      class="absolute bg-warning/20 flex items-center justify-center p-3 rounded-full right-4 top-1/2 z-50 cursor-pointer"
      @click="showToast"
    >
      <UIcon name="ph:warning-fill" size="40" class="text-warning" />
    </div>
    <TopNavigationBar />
    <div
      class="overflow-y-auto flex flex-col items-center"
      :style="{ maxHeight: `calc(100vh - ${TOP_NAVBAR_HEIGHT})` }"
    >
      <!-- <span
        class="text-warning rounded-none bg-warning/20 flex itens-center justify-center font-semibold text-base md:text-2xl text-center p-2 max-h-max w-full gap-4"
      >
        Estamos nos preparando para dar início às nossas atividades! Fique ligado!
      </span> -->
      <div class="w-12/12 pt-8">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
