import { User } from "../domain/user.model";

export abstract class UsersRepository{
  abstract create(user: User): Promise<User>;
  abstract findById(id: number): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
}