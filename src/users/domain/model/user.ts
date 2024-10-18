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
  password: string;
  @Expose()
  weight: number;
  @Expose()
  yearOfBirth: number;
  @Expose()
  private waterIntake:number;
  @Expose()
  city: string;
  @Expose()
  state: string;

  constructor(
    name:string,
    email:string,
    password:string,
    weight:number,
    yearOfBirth:number,
    city:string,
    state:string
  ){
    this.id = randomUUID()
    this.name = name
    this.email = email
    this.password = password
    this.weight = weight
    this.yearOfBirth
    this.waterIntake = 0
    this.city = city
    this.state = state
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

  getYearOfBirth(){
    return this.yearOfBirth;
  }

  setYearOfBirth(yearOfBirth:number){
    return this.yearOfBirth=yearOfBirth;
  }

  getWaterIntake(){
    return this.waterIntake;
  }

  setWaterIntake(waterIntake:number){
    return this.waterIntake = waterIntake;
  }

  getCity():string {
    return this.city
  }
  
  setCity(city:string){
    return this.city = city
  }

  getState():string {
    return this.state
  }
  
  setState(state:string){
    return this.state = state
  }
}
