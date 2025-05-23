<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      title?: string;
      subtitle?: string;
    }>(),
    {
      title: 'Nenhum resultado encontrado',
      subtitle: 'Tente ajustar os filtros ou verifique sua conexão com a internet.',
    }
  );
</script>

<template>
  <div class="w-full flex flex-col items-center justify-center py-10">
    <UIcon name="mingcute:empty-box-fill" class="w-16 h-16 text-primary text-6xl mb-4" />
    <h2 class="text-2xl font-bold text-center text-primary">
      {{ props.title }}
    </h2>
    <p class="text-neutral-400">
      {{ props.subtitle }}
    </p>
  </div>
</template>
