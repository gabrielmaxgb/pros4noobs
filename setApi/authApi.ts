import type { ApiOptions } from './types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const authApi = <T>(url: string, options?: ApiOptions) =>
  $fetch<T>(url, { ...options, credentials: 'include' });
