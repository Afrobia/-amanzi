
import { CreateUserDto } from '../../../users/http/dto/create-user.dto';
import { User } from '../../domain/model/user';
import { UserServiceInterface } from 'src/users/domain/service/user-service.interface';


// in-memory
export class UsersServiceMock implements UserServiceInterface {
  private readonly users: User[] = [];

  create(body:CreateUserDto): Promise<User> {
    const user = new User()
    this.users.push(user);
    return Promise.resolve(user);
  }
  findAllUsers(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
}
