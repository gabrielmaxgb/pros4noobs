import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app"

export default defineNuxtRouteMiddleware((to, from) => {
  
  return navigateTo('/')
})