import { User as rawUser } from "@prisma/client";
import { Email } from "@application/entities/email";
import { User } from "@application/entities/user";
import { Username } from "@application/entities/username";

export class PrismaUserMapper {
  static toPrisma(user: User): rawUser {
    return {
      id: user.id,
      email: user.email.toString(),
      username: user.username.toString(),
      password: user.password,
      created_at: user.createdAt,
      updated_at: user.updatedAt,
    };
  }

  static toDomain(user: rawUser): User {
    return new User({
      id: user.id,
      email: new Email(user.email),
      username: new Username(user.username),
      password: user.password,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    });
  }
}
