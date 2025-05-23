export default defineNuxtRouteMiddleware(async () => {
  const session = useSession();

  if (!session.isAuthenticated.value) {
    await session.fetchSession();
  }

  if (session.isAuthenticated.value) {
    return navigateTo({
      name: 'user-userId-dashboard',
      params: { userId: session.user.value?.id },
    });
  }
});
