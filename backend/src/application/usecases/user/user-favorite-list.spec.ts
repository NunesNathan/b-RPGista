import { UserFactory } from "@test/factories/users.factory";
import { InMemoryUsersRepository } from "@test/repositories/In-memory-users.repository";
import { UserFavoriteList } from "./user-favorite-list";
import { UserFind } from "./user-find";

describe("Get user favorite list", () => {
  const makeUser = UserFactory.user;

  it("should be able to get a favorite list using id", async () => {
    const usersRepository = new InMemoryUsersRepository();
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
