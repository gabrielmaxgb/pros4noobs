export enum UserRole {
    NOOB = 'noob',
    PRO = 'pro',
}

export interface UserModel {
    id: string;
    name: string;
    email: string;
    technologies: string[];
    initialRoles: UserRole[];
}

