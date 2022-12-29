import { UserFactory } from "@test/factories/users-factory";
import { InMemoryUserRepository } from "@test/repositories/InMemoryUsersRepository";
import { UserFind } from "./user-find";
import { UserFavoriteList } from "./user-favorite-list";

describe("Get user favorite list", () => {
  const makeUser = UserFactory.user;

  it("should be able to get a favorite list using id", async () => {
    const usersRepository = new InMemoryUserRepository();
    const userFind = new UserFind(usersRepository);
    const userFavoriteList = new UserFavoriteList(usersRepository);

    await usersRepository.create(makeUser());

    expect(await userFind.execute("test-tester-id-1")).toEqual(
      expect.objectContaining({ id: "test-tester-id-1" }),
    );

    expect(await userFavoriteList.execute("test-tester-id-1")).toEqual(
      expect.objectContaining({ count: 0, saved: [] }),
    );
  });
});
