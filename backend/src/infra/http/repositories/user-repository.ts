import { Favorites } from "@application/entities/user/favorites";
import { User } from "@application/entities/user/user";

export abstract class UserRepository {
  abstract findMany(): Promise<User[]>;

  abstract find(id: string): Promise<User | null>;

  abstract findByEmail(email: string): Promise<User | null>;

  abstract findFavorites(id: string): Promise<Favorites | null>;

  abstract create(user: User): Promise<User>;

  abstract update(user: User): Promise<User | null>;

  abstract delete(email: string): Promise<void>;
}
