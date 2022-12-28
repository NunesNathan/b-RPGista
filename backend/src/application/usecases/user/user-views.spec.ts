import { makeUser } from "@test/factories/users-factory";
import { InMemoryUserRepository } from "@test/repositories/InMemoryUsersRepository";
import { UserFind } from "./user-find";
import { UserViews } from "./user-views";

describe("Add view to user", () => {
  it("should be able to get a user using id", async () => {
    const usersRepository = new InMemoryUserRepository();
    const userFind = new UserFind(usersRepository);
    const userViews = new UserViews(usersRepository);

    await usersRepository.create(makeUser());

    expect(await userFind.execute("test-tester-id-1")).toEqual(
      expect.objectContaining({ id: "test-tester-id-1" }),
    );

    userViews.execute("test-tester-id-1");
    userViews.execute("test-tester-id-1");

    expect(await userFind.execute("test-tester-id-1")).toEqual(
      expect.objectContaining({ views: 2 }),
    );
  });
});
