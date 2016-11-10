export interface IUser {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  username: string;
  permissions: IPermissions
}

export interface IPermissions{
  admin?: boolean;
}

export interface IUserType {
  type?: string;
}
