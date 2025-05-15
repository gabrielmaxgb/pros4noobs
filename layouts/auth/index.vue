<script setup lang="ts">
  import SideNavigationBar from './components/SideNavigationBar.vue';
</script>

<template>
  <div class="w-full h-[100vh] flex bg-gradient-to-br from-primary/40 via-black to-secondary/20">
    <SideNavigationBar />
    <section class="w-full flex justify-center overflow-y-auto">
      <div class="w-11/12 h-fit py-6">
        <slot />
      </div>
    </section>
  </div>
</template>
