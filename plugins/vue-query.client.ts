import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const queryClient = new QueryClient()

  nuxtApp.vueApp.use(VueQueryPlugin, {
    queryClient,
  })
})
