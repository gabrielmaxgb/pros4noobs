import type { IUserModel } from '~/shared/user';
import { getSession } from '../setApi/authApi';

export const useSession = () => {
  const session = useState('session', () => ({
    isAuthenticated: false,
    user: null as null | IUserModel,
  }));

  const fetchSession = async () => {
    try {
      const data = await getSession();

      session.value.isAuthenticated = true;
      session.value.user = data;
    } catch (err) {
      console.error('Error fetching session:', err);
      session.value.isAuthenticated = false;
      session.value.user = null;
    }
  };

  const logout = async () => {
    // TODO: await $fetch('/api/auth/logout', { method: 'POST' });
    session.value.isAuthenticated = false;
    session.value.user = null;
    navigateTo('/login');
  };

  return {
    isAuthenticated: session.value.isAuthenticated,
    user: session.value.user,
    fetchSession,
    logout,
  };
};
