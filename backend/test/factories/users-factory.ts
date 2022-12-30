import { Username } from "@application/entities/username";
import { Email } from "@application/entities/email";
import { User, UserProps } from "@application/entities/user";
import {
  ContentType,
  Favorite,
  Favorites,
} from "@application/entities/favorites";

type Override = Partial<UserProps>;

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

  static favorite(override: Override = {}): Favorite {
    return {
      contentId: "test-content-id-1",
      contentType: ContentType.SKILL,
      favorited_at: new Date(),
      ...override,
    };
  }
}
