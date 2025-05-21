import { VueQueryPlugin, QueryClient, hydrate, dehydrate } from '@tanstack/vue-query';
import type { DehydratedState, VueQueryPluginOptions } from '@tanstack/vue-query';
import { defineNuxtPlugin, useState } from '#imports';

export default defineNuxtPlugin((nuxt) => {
  const vueQueryState = useState<DehydratedState | null>('vue-query', () => null);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutos
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });

  const options: VueQueryPluginOptions = { queryClient };

  nuxt.vueApp.use(VueQueryPlugin, options);

  if (import.meta.server) {
    nuxt.hooks.hook('app:rendered', () => {
      vueQueryState.value = dehydrate(queryClient);
      console.log('✅ Vue Query dehydrated on server');
    });
  }

  if (import.meta.client) {
    nuxt.hooks.hook('app:created', () => {
      if (vueQueryState.value) {
        hydrate(queryClient, vueQueryState.value);
        console.log('✅ Vue Query hydrated on client');
      }
    });
  }
});
