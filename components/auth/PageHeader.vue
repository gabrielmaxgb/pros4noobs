<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      title?: string;
      subtitle: string;
    }>(),
    {
      title: '',
    }
  );
</script>

<template>
  <Paper
    class="w-full flex flex-col rounded-md bg-gradient-to-tl from-primary/10 via-black/10 to-secondary/10"
  >
    <h1 class="font-header text-2xl text-primary">{{ props.title }}</h1>
    <p class="">{{ props.subtitle }}</p>
  </Paper>
</template>
