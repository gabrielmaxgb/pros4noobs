<script setup lang="ts">
  import { TOP_NAVBAR_HEIGHT } from '~/constants';
</script>

<template>
  <div
    class="w-full h-[100vh] relative bg-gradient-to-br from-primary/40 via-black to-secondary/20"
  >
    <TopNavigationBar />
    <div
      class="overflow-y-auto flex flex-col items-center"
      :style="{ maxHeight: `calc(100vh - ${TOP_NAVBAR_HEIGHT})` }"
    >
      <div class="w-12/12 pt-8">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
