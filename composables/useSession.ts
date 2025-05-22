import type { IUserModel } from '~/shared/user';
import { getSession } from '../setApi/authApi';

type TSession = {
  isAuthenticated: boolean;
  user: IUserModel | null;
};

export const useSession = () => {
  const _session = useState<TSession>('session', () => ({
    isAuthenticated: false,
    user: null,
  }));

  const isAuthenticated = computed(() => _session.value.isAuthenticated);
  const user = computed(() => _session.value.user);

  const fetchSession = async () => {
    try {
      const data = await getSession();
      _session.value.isAuthenticated = true;
      _session.value.user = data;
    } catch (err) {
      console.error('Error fetching session:', err);
      _session.value.isAuthenticated = false;
      _session.value.user = null;
    }
  };

  const setSession = (userData: IUserModel) => {
    _session.value.isAuthenticated = true;
    _session.value.user = userData;
  };

  const logout = async () => {
    // await $fetch('/api/auth/logout', { method: 'POST' });
    _session.value.isAuthenticated = false;
    _session.value.user = null;
    navigateTo('/login');
  };

  return {
    isAuthenticated,
    user,
    fetchSession,
    setSession,
    logout,
  };
};
