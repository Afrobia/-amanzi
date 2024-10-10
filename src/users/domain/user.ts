import { randomUUID } from "crypto";

export class User {
  private id: string;
  private name: string;
  private email: string;
  private password: string;
  private goal: Goal[]

  constructor(){
    this.id = randomUUID()
    this.goal = []
  }

  getId():string{
    return this.id
  }

  getName():string {
    return this.name
  }
  
  setName(name:string){
    return this.name = name
  }

  getEmail():string {
    return this.email
  }
  
  setEmail(email:string){
    return this.email = email
  }

  getPassword():string {
    return this.password
  }
  
  setPassword(password:string){
    this.password = password
  }


}

export class Goal {
  private id: string;
  private weigth: number;
  private goal: number;
  private date: Date;
  private city: string;
}
