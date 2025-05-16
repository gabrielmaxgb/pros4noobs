export const useLogout = () => {
  const logout = async () => {
    try {
      // await $fetch('/api/logout', { method: 'POST' });

      // Redireciona para tela de login
      await navigateTo('/login');

      // Poderia também limpar algum estado global, se necessário
    } catch (err) {
      console.error('Erro ao fazer logout', err);
    }
  };

  return { logout: () => logout() };
};
