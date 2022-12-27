import { User } from "@application/entities/user";
import { UserRepository } from "@infra/http/repositories/user-repository";

export class InMemoryUserRepository implements UserRepository {
  public users: User[] = [];

  async findMany(): Promise<User[]> {
    return this.users;
  }

  async create(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }
}
