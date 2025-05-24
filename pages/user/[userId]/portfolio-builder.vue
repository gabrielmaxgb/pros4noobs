<script setup lang="ts">
  import type { TabsItem } from '@nuxt/ui';

  definePageMeta({
    layout: 'auth',
    ssr: false,
  });

  type MyTabsItem = TabsItem & {
    value: 'editor' | 'preview';
  };

  const route = useRoute();
  const router = useRouter();
  const currentTab = ref<MyTabsItem['value']>('editor');

  const items: MyTabsItem[] = [
    {
      label: 'Editor',
      value: 'editor',
    },
    {
      label: 'Prévia',
      value: 'preview',
    },
  ];

  watch(
    () => currentTab.value,
    () => {
      router.push({
        name: `user-userId-portfolio-builder-${currentTab.value}`,
        params: { userId: route.params.userId },
      });
    }
  );
</script>

<template>
  <div class="w-full flex flex-col gap-6">
    <UTabs
      v-model="currentTab"
      :content="false"
      variant="link"
      :items="items"
      size="xl"
      class="w-full"
    />
    <NuxtPage />
  </div>
</template>
