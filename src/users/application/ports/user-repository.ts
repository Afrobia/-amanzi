import { User } from "../../domain/model/user";


export abstract class UserRepositoryInterface {
  abstract registerUser(user: User): Promise<User>;
  abstract getAllUsers(): Promise<User[]>;
  abstract findEmail(email: string): Promise<User | null>;
  abstract modifySave(user:User):Promise<User>
  abstract deleteUser(email: string);
}

export const USER_REPO_TOKEN = Symbol();
