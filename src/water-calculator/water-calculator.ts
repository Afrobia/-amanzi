export class WaterIntake{
    weight: number
    waterintake:number
    city:string
    state:string
    temperature:  number
    humidity: number
    message:string

    constructor(weight: number,
        city:string,
        state:string,
        humidity:number,
        temp:number,
        message:string){
            this.weight = weight
            this.city = city
            this.state = state
            this.humidity = humidity
            this.temperature = temp
            this.message = message
    }
}