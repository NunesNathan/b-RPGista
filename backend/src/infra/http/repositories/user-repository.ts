import { User } from "@application/entities/user";

export abstract class UserRepository {
  abstract findMany(): Promise<User[]>;

  abstract create(user: User): Promise<User>;
}
