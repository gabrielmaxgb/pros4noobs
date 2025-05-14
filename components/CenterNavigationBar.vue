<script setup lang="ts">
  import { navigationOptions } from '~/constants';

  const route = useRoute();
</script>

<template>
  <section class="hidden max-w-fit md:flex items-center gap-4 overflow-x-scroll">
    <NuxtLink
      v-for="(btn, index) in navigationOptions"
      :to="btn?.disabled ? '#' : btn.to"
      @click.prevent="btn?.disabled && console.log('Disabled')"
      :class="['flex gap-4 min-w-fit', btn.disabled ? 'cursor-not-allowed opacity-50' : '']"
    >
      <UButton
        class="cursor-pointer text-sm"
        color="primary"
        :variant="route.path === btn.to ? 'solid' : 'outline'"
        :disabled="btn.disabled"
      >
        {{ btn.label }}
      </UButton>
      <USeparator
        v-if="!(index === navigationOptions.length - 1)"
        orientation="vertical"
        class="h-8"
        color="primary"
      />
    </NuxtLink>
  </section>
</template>
