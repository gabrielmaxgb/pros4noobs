export type ApiOptions = Omit<Parameters<typeof $fetch>[1], 'credentials'>;

export type ApiResponse<T> = {
  data: T;
  status: number;
  message: string;
};

export type TUserRegistrationTechnologiesListResponse = string[]; // only data attribute
// export type TUserRegistrationTechnologiesResponse = ApiResponse<TUserTechnologies>;
