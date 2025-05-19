<script setup lang="ts">
  import type { TabsItem } from '@nuxt/ui';

  definePageMeta({
    layout: 'auth',
  });

  const route = useRoute();
  const router = useRouter();

  console.log('route', route);
  console.log('router', router.getRoutes());

  const items: TabsItem[] = [
    {
      label: 'Editor',
      value: 'editor',
    },
    {
      label: 'Prévia',
      value: 'preview',
    },
  ];

  const active = computed({
    get() {
      return (route.query.tab as string) || 'editor';
    },
    set(tab) {
      navigateTo({
        name: `user-userId-portfolio-builder-${tab}`,
        params: { userId: route.params.userId },
        query: { tab },
        hash: '#control-active-item',
      });
    },
  });
</script>

<template>
  <div class="w-full flex flex-col gap-6">
    <UTabs
      v-model="active"
      :content="false"
      variant="link"
      :items="items"
      size="xl"
      class="w-full"
    />
    <NuxtPage />
  </div>
</template>
