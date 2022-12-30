import { Favorite, Favorites } from "@application/entities/favorites";
import { User } from "@application/entities/user";
import { Prisma } from "@prisma/client";

export interface HttpUser {
  id: string;
  username: string;
  email: string;
  views: number;
  favorites: Prisma.JsonValue;
  createdAt: Date;
  updatedAt: Date;
}

export interface HttpFavorite {
  userId: string;
  count: number;
  saved: Favorite[];
}

export class UserViewModel {
  static toHttp(user: User): HttpUser {
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

  static favoriteToHttp(userId: string, favorites: Favorites): HttpFavorite {
    return {
      userId,
      count: favorites.count,
      saved: favorites.saved,
    };
  }
}
