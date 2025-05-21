<script setup lang="ts">
  import { UIcon } from '#components';

  defineProps<{
    label: string;
    icon: string;
    active: boolean;
    collapsed: boolean;
  }>();

  const emit = defineEmits<{
    (e: 'click'): void;
  }>();
</script>

<template>
  <UButton
    class="cursor-pointer flex items-center rounded-none !px-6"
    :class="{ 'justify-center': collapsed }"
    :variant="active ? 'soft' : 'ghost'"
    size="xl"
    @click="emit('click')"
  >
    <UIcon :name="icon" size="20" />

    <span
      class="whitespace-nowrap transition-all duration-300 delay-100"
      :class="collapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'"
    >
      {{ label }}
    </span>
  </UButton>
</template>
