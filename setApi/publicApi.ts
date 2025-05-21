import type { ApiOptions, ApiResponse, TUserRegistrationTechnologiesListResponse } from './types';

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
