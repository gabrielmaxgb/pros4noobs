<script setup lang="ts">
  const props = defineProps<{
    sectionName: string;
  }>();
</script>

<template>
  <section class="w-full grid grid-cols-12">
    <div class="col-span-3">
      <span class="text-primary text-lg">{{ props.sectionName }}</span>
    </div>
    <div class="col-span-9">
      <slot name="form" />
    </div>
  </section>
</template>
