import { Favorites } from "@application/entities/favorites";
import { User } from "@application/entities/user";
import { UserRepository } from "@infra/http/repositories/user-repository";

export class InMemoryUserRepository implements UserRepository {
  public users: User[] = [];

  async update(user: User): Promise<User> {
    const findedUser = this.find(user.id);

    if (!findedUser) {
      throw new Error("User not found");
    }

    this.users = this.users.map((eUser) => {
      if (user.id === eUser.id) {
        return user;
      }
      return eUser;
    });

    return findedUser;
  }

  async find(id: string): Promise<User> {
    return this.users.filter((user) => user.id === id)[0];
  }

  async findFavorites(id: string): Promise<Favorites> {
    const findedUser = await this.find(id);

    if (!findedUser) {
      throw new Error("User not found");
    }

    return new Favorites(findedUser.favorites);
  }

  async findMany(): Promise<User[]> {
    return this.users;
  }

  async create(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }
}
