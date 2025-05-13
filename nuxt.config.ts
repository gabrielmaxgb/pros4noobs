import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    MONGODB_URI: process.env.MONGODB_URI,
  },

  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  plugins: [
    '~/plugins/vue-query.client.ts'
  ],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  fonts: {
    families: [
      { name: 'Chakra Petch', provider: 'google' },
      { name: 'Gloock', provider: 'google' },
      { name: 'JetBrains Mono', provider: 'google' },
      { name: 'Staatliches', provider: 'google' },
      { name: 'Orbitron', provider: 'google' }
    ]
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@nuxt/scripts',
    '@pinia/nuxt'
  ]
})