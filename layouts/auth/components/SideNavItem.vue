<script setup lang="ts">
  const props = defineProps<{
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
    <slot v-if="$slots['custom-content']" name="custom-content" />
    <div v-else class="flex items-center" :class="[!collapsed ? 'gap-3' : '']">
      <UIcon
        :name="icon"
        size="20"
        class="text-neutral-400"
        :class="{ 'text-primary': props.active }"
      />

      <span
        class="whitespace-nowrap"
        :class="[
          collapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto',
          props.active ? 'text-primary' : 'text-neutral-400',
        ]"
      >
        {{ label }}
      </span>
    </div>
  </UButton>
</template>
