// export enum UserRole {
//   NOOB = 'noob',
//   PRO = 'pro',
// }

export type TUserRole = 'noob' | 'pro';

export interface IUserModel {
  id: string;
  name: string;
  email: string;
  technologies: string[];
  initialRole: TUserRole;
  roles: TUserRole[];
  superNoob: boolean;
}
