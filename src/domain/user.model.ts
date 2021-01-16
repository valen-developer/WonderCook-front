export class User {
  uuid: string;
  name: string;
  email: string;
  alias: string;
  createAt: string;
  updateAt: string;
  bio: string;

  constructor(userObject: UserObject) {
    this.uuid = userObject.uuid;
    this.name = userObject.name;
    this.email = userObject.email;
    this.alias = userObject.alias;
    this.createAt = userObject.createAt;
    this.updateAt = userObject.updateAt;
    this.bio = userObject.bio ? userObject.bio : '';
  }
}

interface UserObject {
  uuid: string;
  name: string;
  email: string;
  alias: string;
  createAt: string;
  updateAt: string;
  bio?: string;
}

export interface UserObjectWithPassword {
  uuid: string;
  name: string;
  email: string;
  password: string;
  alias: string;
  createAt: string;
  updateAt: string;
  bio?: string;
}
