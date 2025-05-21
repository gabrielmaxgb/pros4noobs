import type { TLoginForm } from '~/pages/login.vue';
import type {
  ApiOptions,
  TLoginResponse,
  TUserRegistrationTechnologiesListResponse,
} from './types';
import type { ApiResponse } from '~/shared/apiResponse';
import type { IUserModel } from '~/shared/user';

const publicApi = <T>(url: string, options?: ApiOptions) =>
  $fetch<ApiResponse<T>>(url, { ...options, credentials: 'omit' });

export const getUserRegistrationTechnologies =
  async (): Promise<TUserRegistrationTechnologiesListResponse> => {
    const { data } =
      await publicApi<TUserRegistrationTechnologiesListResponse>('/api/technologies');
    return data;
  };

export const createUser = async (payload: TRegistrationForm) => {
  const { data } = await publicApi('/api/users/create', {
    method: 'POST',
    body: payload,
  });
  return data;
};

export const login = async (payload: TLoginForm): Promise<TLoginResponse> => {
  const { data } = await publicApi<TLoginResponse>('/api/users/login', {
    method: 'POST',
    body: payload,
  });
  console.log('login', data);
  return data;
};

export const getSession = async (): Promise<IUserModel> => {
  const { data } = await publicApi<IUserModel>('/api/users/who');
  console.log('getSession', data);
  return data;
};
