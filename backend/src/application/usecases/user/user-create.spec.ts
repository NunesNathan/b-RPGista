import { Email } from "@application/entities/user/email";
import { Favorites } from "@application/entities/user/favorites";
import { Username } from "@application/entities/user/username";
import { UserFactory } from "@test/factories/users.factory";
import { InMemoryUsersRepository } from "@test/repositories/In-memory-users.repository";
import { UserFindMany } from "./user-find-many";

describe("Create user", () => {
  const makeUser = UserFactory.user;
  it("should be able to create a user", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const userFindMany = new UserFindMany(usersRepository);

    await usersRepository.create(makeUser());

    expect(await userFindMany.execute()).toHaveLength(1);
    expect(await userFindMany.execute()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: "test-tester-id-1" }),
      ]),
    );
  });

  it("should not be able to create a user with invalid email", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const userFindMany = new UserFindMany(usersRepository);

    try {
      await usersRepository.create(makeUser({ email: new Email("") }));
    } catch (e) {
      expect(await userFindMany.execute()).toHaveLength(0);
    }

    try {
      await usersRepository.create(
        makeUser({ email: new Email("111@222.333") }),
      );
    } catch (e) {
      expect(await userFindMany.execute()).toHaveLength(0);
    }
  });

  it("should not be able to create a user with invalid user name", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const userFindMany = new UserFindMany(usersRepository);

    try {
      await usersRepository.create(makeUser({ username: new Username("ccc") }));
    } catch (e) {
      expect(await userFindMany.execute()).toHaveLength(0);
    }

    try {
      await usersRepository.create(
        makeUser({ username: new Username("c".repeat(21)) }),
      );
    } catch (e) {
      expect(await userFindMany.execute()).toHaveLength(0);
    }
  });

  it("should not be able to create a user with invalid favorites", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const userFindMany = new UserFindMany(usersRepository);

    try {
      await usersRepository.create(
        makeUser({ favorites: new Favorites('{"count":"number","saved":[]}') }),
      );
    } catch (e) {
      expect(await userFindMany.execute()).toHaveLength(0);
    }

    try {
      await usersRepository.create(makeUser({ favorites: new Favorites("") }));
    } catch (e) {
      expect(await userFindMany.execute()).toHaveLength(0);
    }
  });
});
