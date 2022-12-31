import { Favorites } from "@application/entities/favorites";
import { User } from "@application/entities/user";

export abstract class UserRepository {
  abstract findMany(): Promise<User[]>;

  abstract find(id: string): Promise<User>;

  abstract findByEmail(email: string): Promise<User>;

  abstract findFavorites(id: string): Promise<Favorites>;

  abstract create(user: User): Promise<User>;

  abstract update(user: User): Promise<User>;

  abstract delete(email: string): Promise<void>;
}
