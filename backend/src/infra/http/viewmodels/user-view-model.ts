import { User } from "@application/entities/user";

export class UserViewModel {
  static toHttp(user: User) {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
