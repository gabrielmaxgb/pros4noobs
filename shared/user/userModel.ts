// export enum UserRole {
//   NOOB = 'noob',
//   PRO = 'pro',
// }

export const USER_ROLES = ['noob', 'pro'] as const;

export type TUserRole = (typeof USER_ROLES)[number];

export interface IUserModel {
  id: string;
  name: string;
  email: string;
  startedAsSuperBeginner: boolean;
  technologies: string[];
  initialRole: TUserRole;
  roles: TUserRole[];
}
