import { randomUUID } from "crypto";

export class User {
  private id: string;

  private name: string;

  private email: string;

  private password: string;

  constructor(name: string, email:string, password: string){
    this.id = randomUUID()
    this.name = name
    this.email = email
    this.password = password
  }

  getId():string{
    return this.id
  }

  getName():string{
    return this.name
  }

  getEmail():string{
    return this.email
  } 

  setEmail(email):string{
    return this.email = email
  }

  getPassword():string{
    return this.password
  }
  
  setPassword(password):string{
   return this.password = password
  }

}
