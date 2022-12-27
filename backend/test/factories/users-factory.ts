import { Username } from "@application/entities/username";
import { Email } from "@application/entities/email";
import { User, UserProps } from "@application/entities/user";

type Override = Partial<UserProps>;

export function makeUser(override: Override = {}): User {
  return new User({
    id: "test-tester-id-1",
    username: new Username("test"),
    email: new Email("test@test.com"),
    password: "test",
    createdAt: new Date(),
    updatedAt: new Date(),
    ...override,
  });
}
