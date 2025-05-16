<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      title: string;
      description: string;
    }>(),
    {}
  );
</script>

<template>
  <Paper class="w-full flex flex-col rounded-md p-6">
    <h1 class="font-header text-2xl text-primary">{{ props.title }}</h1>
    <p class="">{{ props.description }}</p>
  </Paper>
</template>
