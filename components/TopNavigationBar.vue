<script setup lang="ts">
  import { TOP_NAVBAR_HEIGHT, navigationOptions } from '~/constants';
</script>

<template>
  <div
    class="w-full max-w-full sticky flex items-center justify-center top-0 z-20 bg-internal-black/60 backdrop-blur-sm"
    :style="{ height: TOP_NAVBAR_HEIGHT }"
  >
    <div class="w-11/12 lg:w-10/12 flex items-center justify-between py-2">
      <NuxtLink to="/">
        <div class="flex items-center">
          <img src="/public/p4n-logo.svg" class="size-8 mr-2" />
          <div class="text-primary text-lg font-header">Pros 4 Noobs</div>
        </div>
      </NuxtLink>
      <CenterNavigationBar class="hidden lg:flex" />
      <UDropdownMenu
        :items="navigationOptions"
        :content="{
          align: 'start',
          side: 'left',
          sideOffset: 8,
        }"
        class="md:hidden"
      >
        <UButton
          icon="i-lucide-menu"
          size="xl"
          class="size-10 text-2xl"
          color="primary"
          variant="soft"
        />
      </UDropdownMenu>
    </div>
  </div>
</template>
