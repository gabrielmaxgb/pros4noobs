export default defineNuxtRouteMiddleware((_to, _from) => {
  // Aqui você pode usar qualquer store de autenticação que estiver usando
  // Por exemplo: const auth = useAuthStore()
  // Se não estiver autenticado, redireciona para login
  // if (!user.value) {
  //   return navigateTo('/login')
  // }

  const authenticated = true;

  return !!authenticated || navigateTo('/login');
});
