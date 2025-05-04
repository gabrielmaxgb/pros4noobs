<script setup lang="ts">
import { TOP_NAVBAR_HEIGHT } from "~/constants";
</script>

<template>
  <div
    class="w-full h-[100vh] absolute bg-gradient-to-br from-primary/40 via-black to-secondary/20"
  >
    <TopNavigationBar />
    <span
      class="text-warning bg-warning/20 font-bold text-2xl text-center p-2 rounded-lg block max-h-max w-full"
      >Lançaremos em breve! Fique ligado!</span
    >
    <div
      class="overflow-y-auto flex justify-center"
      :style="{ maxHeight: `calc(100vh - ${TOP_NAVBAR_HEIGHT})` }"
    >
      <div class="w-12/12 py-6">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
