import { User } from "../../../users/domain/user";

export abstract class UserRepository {
    
    abstract registerUser(user: User):Promise<User>
    abstract getAll(): Promise<User[]> 
    abstract findForEmail(email: string):Promise<User | null>
    abstract deleteUser(email:string)
}