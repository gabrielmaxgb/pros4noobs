export default defineNuxtRouteMiddleware(async (to) => {
  const publicRoutes = ['login', 'index', 'onboarding', 'about', 'all'];
  if (publicRoutes.includes(to.name as string)) {
    return;
  }
  const session = useSession();

  if (session.isAuthenticated) {
    return;
  }
  if (!session.isAuthenticated) {
    return navigateTo({ name: 'login' });
  }
  try {
    await session.fetchSession();
    if (!session.user.value) {
      return navigateTo({ name: 'login' });
    }
  } catch {
    return navigateTo({ name: 'login' });
  }
});
