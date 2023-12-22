export interface UserInterface {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    userGender: UserGender;
    phoneNumber?: string;
    friends?: UserInterface[];
    profileImage?: {public_id: string, url: string};
}

export interface CreateUserDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    userGender: UserGender;
    profileImage?: {public_id: string, url: string}
}

export interface UpdateUserDto {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    userGender?: UserGender;
    phoneNumber?: string;
    profileImage?: {public_id: string, url: string};
}

export interface LoginUserDto {
    email: string;
    password: string;
}

export enum UserRole {
    SUPER_ADMIN = 'superAdmin',
    ADMIN = 'admin',
    USER = 'user',
}

export enum UserGender {
    MALE = 'male',
    FEMALE = 'female',
}
