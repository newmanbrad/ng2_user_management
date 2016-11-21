export class User {

  constructor(
    public _id?: string,
    public username?: string,
    public password?: string,
    public email?: string,
    public firstName?: string,
    public lastName?: string,
    public permissions?: Permissions) {
  }
}

// inner object for permissions
export class Permissions {

  constructor(
    public admin?: string
  ){}
}
