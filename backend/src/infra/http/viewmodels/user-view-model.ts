import { Favorites } from "@application/entities/favorites";
import { User } from "@application/entities/user";

export class UserViewModel {
  static toHttp(user: User) {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      views: user.views,
      favorites: user.favorites,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  static favoriteToHttp(userId: string, favorites: Favorites) {
    return {
      userId,
      count: favorites.count,
      saved: favorites.saved,
    };
  }
}
