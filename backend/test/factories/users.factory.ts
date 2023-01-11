import { Email } from "@application/entities/user/email";
import {
  ContentType,
  Favorite,
  Favorites,
} from "@application/entities/user/favorites";
import { User, UserProps } from "@application/entities/user/user";
import { Username } from "@application/entities/user/username";

type Override = Partial<UserProps>;
type OverrideFavorite = Partial<Favorite>;

export class UserFactory {
  static user(override: Override = {}): User {
    return new User({
      id: "test-tester-id-1",
      username: new Username("test"),
      email: new Email("test@test.com"),
      password: "test",
      views: 0,
      favorites: new Favorites('{"count":0,"saved":[]}'),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...override,
    });
  }

  static favorite(override: OverrideFavorite = {}): Favorite {
    return {
      contentId: "test-content-id-1",
      contentType: ContentType.SKILL,
      favorited_at: new Date(),
      ...override,
    };
  }
}
