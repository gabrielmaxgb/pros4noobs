import type { IUserModel } from '~/shared/user';
import { getSession, logout as logoutReq } from '../setApi/authApi';
import { useMutation } from '@tanstack/vue-query';

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

  const { mutate: logoutMutation } = useMutation({
    mutationFn: () => logoutReq(),
    onSuccess: async () => {
      endSession();
      navigateTo({
        name: 'login',
      });
    },
    onError: (error) => {
      console.error('Erro ao fazer logout:', error);
    },
  });

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

  const endSession = async () => {
    _session.value.isAuthenticated = false;
    _session.value.user = null;
  };

  const setSession = (userData: IUserModel) => {
    _session.value.isAuthenticated = true;
    _session.value.user = userData;
  };

  const logout = async () => {
    logoutMutation();
  };

  return {
    isAuthenticated,
    user,
    fetchSession,
    endSession,
    setSession,
    logout,
  };
};
