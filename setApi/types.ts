export type ApiOptions = Omit<Parameters<typeof $fetch>[1], 'credentials'>;

export type ApiResponse<T> = {
  data: T;
  status: number;
  message: string;
};

// only data attribute typing is required
export type TUserRegistrationTechnologiesListResponse = string[];
