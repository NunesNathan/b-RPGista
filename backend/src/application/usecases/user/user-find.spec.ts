import { makeUser } from "@test/factories/users-factory";
import { InMemoryUserRepository } from "@test/repositories/InMemoryUsersRepository";
import { UserFind } from "./user-find";

describe("Get user", () => {
  it("should be able to get a user using id", async () => {
    const usersRepository = new InMemoryUserRepository();
    const userFind = new UserFind(usersRepository);

    await usersRepository.create(makeUser());
    await usersRepository.create(makeUser({ id: "test-tester-id-2" }));
    await usersRepository.create(makeUser({ id: "test-tester-id-3" }));

    expect(await userFind.execute("test-tester-id-1")).toEqual(
      expect.objectContaining({ id: "test-tester-id-1" }),
    );
    expect(await userFind.execute("test-tester-id-2")).toEqual(
      expect.objectContaining({ id: "test-tester-id-2" }),
    );
    expect(await userFind.execute("test-tester-id-3")).toEqual(
      expect.objectContaining({ id: "test-tester-id-3" }),
    );
  });
});
