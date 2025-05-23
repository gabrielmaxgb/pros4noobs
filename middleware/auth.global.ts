export default defineNuxtRouteMiddleware(async (to) => {
  const publicRoutes = ['login', 'index', 'onboarding', 'about'];

  if (publicRoutes.includes(to.name as string)) return;

  const session = useSession();

  if (session.isAuthenticated.value) return;

  try {
    await session.fetchSession();

    if (!session.isAuthenticated.value) {
      return navigateTo({ name: 'login' });
    }
  } catch {
    return navigateTo({ name: 'login' });
  }
});
