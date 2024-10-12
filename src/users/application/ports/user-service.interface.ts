import { User } from '../../../users/domain/user';
import { CreateUserDto } from '../../../users/http/dto/create-user.dto';

export abstract class UserServiceInterface {
  abstract create(body: CreateUserDto): Promise<User>;
  abstract list(): Promise<User[]>;
}

export const PRODUCT_SERVICE_TOKEN = Symbol();
