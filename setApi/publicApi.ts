import type { ApiOptions, ApiResponse, TUserTechnologies } from './types';

const publicApi = <T>(url: string, options?: ApiOptions) =>
  $fetch<ApiResponse<T>>(url, { ...options, credentials: 'omit' });

export const getUserRegistrationTechnologies = async (): Promise<TUserTechnologies> => {
  const { data } = await publicApi<TUserTechnologies>('/api/technologies');
  return data;
};
