import type { ApiOptions } from './types';

const publicApi = <T>(url: string, options?: ApiOptions) =>
  $fetch<T>(url, { ...options, credentials: 'omit' });

export const getUserRegistrationTechnologies = async () => {
  // const res = await publicApi('/api/technologies');
  const res = await publicApi('https://catfact.ninja/fact');
  console.log('res', res);
  return res;
};
