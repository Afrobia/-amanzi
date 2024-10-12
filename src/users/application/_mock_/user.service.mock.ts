import { UserServiceInterface } from '../ports/user-service.interface';
import { CreateUserDto } from '../../../users/http/dto/create-user.dto';
import { User } from '../../../users/domain/user';


// in-memory
export class UsersServiceMock implements UserServiceInterface {
  private readonly users: User[] = [];

  create(body:CreateUserDto): Promise<User> {
    const user = new User()
    this.users.push(user);
    return Promise.resolve(user);
  }
  list(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
}
