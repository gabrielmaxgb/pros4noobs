import type { IUserModel } from '~/shared/user';
import type { ApiOptions, TLoginResponse } from './types';
import type { ApiResponse } from '~/shared/apiResponse';
import type { TLoginForm } from '~/pages/login.vue';

const authApi = <T>(url: string, options?: ApiOptions) =>
  $fetch<ApiResponse<T>>(url, { ...options, credentials: 'include' });

// const publicApi = <T>(url: string, options?: ApiOptions) =>
//   $fetch<ApiResponse<T>>(url, { ...options, credentials: 'omit' });

export const getSession = async (): Promise<IUserModel> => {
  const { data } = await authApi<IUserModel>('/api/users/who');
  console.log('getSession', data);
  return data;
};

export const login = async (payload: TLoginForm): Promise<TLoginResponse> => {
  const { data } = await authApi<TLoginResponse>('/api/users/login', {
    method: 'POST',
    body: payload,
  });
  console.log('login', data);
  return data;
};
