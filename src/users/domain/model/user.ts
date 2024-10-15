import { Expose } from "class-transformer";
import { randomUUID } from "crypto";

export class User {
  @Expose()
  private id: string;
  @Expose()
  private name: string;
  @Expose()
  private email: string;
  @Expose()
  private password: string;
  @Expose()
  private weight:number;
  @Expose()
  private waterIntake:number;
    location: any;

  constructor(){
    this.id = randomUUID()
    this.weight = 0
    this.waterIntake = this.calculateWaterIntake(this.weight)
  }

  getId():string{
    return this.id
  }

  setId(id:string) {
    return this.id = id
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
    return this.password = password
  }

  getWeight(){
    return this.weight;
  }

  setWeight(weight:number){
    return this.weight=weight;
  }

  getWaterIntake(){
    return this.waterIntake;
  }

  setWaterIntake(waterIntake:number){
    return this.waterIntake = waterIntake;
  }
  
  calculateWaterIntake(weight:number){
    return this.waterIntake = Number(((35 * weight)/1000).toFixed(2))
  }
  
}


