import type { IUserModel } from '~/shared/user';

export type ApiOptions = Omit<Parameters<typeof $fetch>[1], 'credentials'>;

// only data attribute typing is required ----------------------------------
export type TUserRegistrationTechnologiesListResponse = string[];

export type TLoginResponse = IUserModel;
