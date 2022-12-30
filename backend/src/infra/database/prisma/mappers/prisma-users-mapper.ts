import { Prisma, User as rawUser } from "@prisma/client";
import { Email } from "@application/entities/email";
import { User } from "@application/entities/user";
import { Username } from "@application/entities/username";
import { Favorites } from "@application/entities/favorites";

type PrismaFavorite = {
  favorites: Prisma.JsonValue;
};

export class PrismaUserMapper {
  static toPrisma(user: User): rawUser {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      password: user.password,
      views: user.views,
      favorites: user.favorites,
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
      views: user.views,
      favorites: new Favorites(user.favorites as string),
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    });
  }

  static toDomainFavorite({ favorites }: PrismaFavorite): Favorites {
    return new Favorites(favorites as string);
  }
}
