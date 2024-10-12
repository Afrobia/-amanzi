import { User } from "../../../users/domain/user";


export abstract class UserRepositoryInterface {
  abstract registerUser(user: User): Promise<User>;
  abstract getAllUsers(): Promise<User[]>;
  abstract findEmail(email: string): Promise<User | null>;
  abstract deleteUser(email: string);
}

export const USER_REPO_TOKEN = Symbol();
