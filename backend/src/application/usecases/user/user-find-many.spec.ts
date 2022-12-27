import { makeUser } from "@test/factories/users-factory";
import { InMemoryUserRepository } from "@test/repositories/InMemoryUsersRepository";
import { UserFindMany } from "./user-find-many";

describe("Get users", () => {
  it("should be able to get empty list", async () => {
    const usersRepository = new InMemoryUserRepository();
    const userFindMany = new UserFindMany(usersRepository);

    expect(await userFindMany.execute()).toEqual([]);
  });

  it("should be able to get users list", async () => {
    const usersRepository = new InMemoryUserRepository();
    const userFindMany = new UserFindMany(usersRepository);

    await usersRepository.create(makeUser());
    await usersRepository.create(makeUser({ id: "test-tester-id-2" }));
    await usersRepository.create(makeUser({ id: "test-tester-id-3" }));

    expect(await userFindMany.execute()).toHaveLength(3);
    expect(await userFindMany.execute()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: "test-tester-id-1" }),
        expect.objectContaining({ id: "test-tester-id-2" }),
        expect.objectContaining({ id: "test-tester-id-3" }),
      ]),
    );
  });
});
