import { CreateUserDto } from "../../http/dto/create-user.dto";
import { User } from "../../domain/model/user";


export abstract class UserServiceInterface {
  abstract create(body: CreateUserDto): Promise<User>;
  abstract findAllUsers(): Promise<User[]>;
}

export const PRODUCT_SERVICE_TOKEN = Symbol();
