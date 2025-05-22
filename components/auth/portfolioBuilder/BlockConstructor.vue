<script setup lang="ts">
  import type { TabsItem } from '@nuxt/ui';

  import type { Component } from 'vue';
  import StandardBlockSelector from './blocks/standardBlocks/StandardBlockSelector.vue';
  import CustomBlockCreator from './blocks/customBlocks/CustomBlockCreator.vue';

  type TMyTabsItem = TabsItem & {
    value: 'select-default' | 'create-custom-block';
    component?: Component;
  };

  const currentTab = ref<TMyTabsItem['value']>('select-default');

  const items: TMyTabsItem[] = [
    {
      label: 'Selecionar modelo pronto',
      value: 'select-default',
      component: markRaw(StandardBlockSelector),
    },
    {
      label: 'Criar bloco customizado',
      value: 'create-custom-block',
      component: markRaw(CustomBlockCreator),
      disabled: true,
    },
  ];

  const currentView = computed(() => {
    const currentItem = items.find((item) => item.value === currentTab.value);
    return currentItem?.component || null;
  });
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    currentTab: {{ currentTab }}<br />
    <UTabs
      v-model="currentTab"
      :content="false"
      variant="link"
      :items="items"
      size="xl"
      class="w-full"
    />
    <component :is="currentView" />
    <!-- <BlockContainer /> -->
  </div>
</template>
