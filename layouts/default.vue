<script setup lang="ts">
// import { TOP_NAVBAR_HEIGHT } from "../constants/index";
import { TOP_NAVBAR_HEIGHT } from "~/constants";
</script>

<template>
  <div
    class="w-full h-[100vh] absolute bg-gradient-to-br from-primary/40 via-black to-secondary/20"
  >
    <TopNavigationBar />
    <div
      class="overflow-y-auto flex flex-col items-center"
      :style="{ maxHeight: `calc(100vh - ${TOP_NAVBAR_HEIGHT})` }"
    >
      <span
        class="text-warning rounded-none bg-warning/20 flex itens-center justify-center font-bold text-2xl text-center p-2 max-h-max w-full gap-4"
      >
        <UIcon :name="'typcn:warning'" size="30" class="hidden lg:block" />
        Estamos nos preparando para dar início às nossas atividades! Fique
        ligado!
        <UIcon :name="'typcn:warning'" size="30" class="hidden lg:block" />
      </span>
      <div class="w-12/12 py-6">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
