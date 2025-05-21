export default defineNuxtRouteMiddleware(async (to) => {
  const publicRoutes = ['login', 'index', 'onboarding', 'about', 'all'];
  if (publicRoutes.includes(to.name as string)) {
    return;
  }
  const { isAuthenticated, fetchSession } = useSession();
  if (isAuthenticated === true) return;
  if (isAuthenticated === false) {
    return navigateTo({ name: 'login' });
  }
  try {
    await fetchSession();
    if (!useSession().isAuthenticated) {
      return navigateTo({ name: 'login' });
    }
  } catch {
    return navigateTo({ name: 'login' });
  }
});
