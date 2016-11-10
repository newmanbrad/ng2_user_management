export class User {

  constructor(
    public _id?: string,
    public id?: number,
    public username?: string,
    public password?: string,
    public email?: string,
    public firstName?: string,
    public lastName?: string,
    public permissions?: any) {
  }

}
