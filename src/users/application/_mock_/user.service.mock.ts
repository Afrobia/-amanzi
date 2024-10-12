
import { CreateUserDto } from '../../../users/http/dto/create-user.dto';
import { User } from '../../../users/domain/user';
import { UserServiceInterface } from 'src/users/domain/user-service.interface';


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
