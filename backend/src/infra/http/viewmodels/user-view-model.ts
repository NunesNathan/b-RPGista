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
}
