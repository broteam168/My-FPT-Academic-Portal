import { role } from "./role";

 export class UserAuth
 {
    UserId:Number;
    UserName:string;
    Phone:string;
    Mail:string;
    Address:string;
    LastLogin:string;
    token:string;
    role:role[];
    constructor(responseAuth : any)
    {
      var temp = responseAuth.data.userInfoDto;
      this.token = responseAuth.data.accessToken;
      this.UserId = temp.userId;
      this.UserName = temp.userName;
      this.Phone = temp.phone;
      this.Mail = temp.mail;
      this.Address = temp.address;
      this.LastLogin = temp.lastLogin;
      this.role = temp.roles;
    }
 }