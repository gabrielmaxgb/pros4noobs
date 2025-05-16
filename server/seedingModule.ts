import { defineNuxtModule, createResolver } from '@nuxt/kit';

const { resolve } = createResolver(import.meta.url);

export default defineNuxtModule({
  /**
   * @param options
   * @param nuxt {Nuxt}
   */
  async setup (options, nuxt) {
    nuxt.hook('nitro:init', nitro => {
      nitro.options.plugins.push(resolve('./scripts/seeding-plugin.ts'));
    });
  }
});