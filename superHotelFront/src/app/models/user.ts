export class User {
    id: number;
    username: string;
    password: string;
    email:string;
    enable:boolean;
    role: Array<string>;
  
    constructor(
      id: number,
      username: string,
      password: string,
      email:string,
      enable:boolean,
      role: Array<string>,
    ) {
      this.id = id;
      this.username = username;
      this.email = email;
      this.enable = enable;
      this.password = password;
      this.role = role;
    }
  }
  
