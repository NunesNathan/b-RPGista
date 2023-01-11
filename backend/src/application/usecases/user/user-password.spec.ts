import { UserFactory } from "@test/factories/users.factory";
import { InMemoryUsersRepository } from "@test/repositories/In-memory-users.repository";
import { UserFind } from "./user-find";
import { UserPassword } from "./user-password";

describe("Change user password", () => {
  const makeUser = UserFactory.user;

  it("should be able to change a user password using id", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const userFind = new UserFind(usersRepository);
    const userPassword = new UserPassword(usersRepository);

    await usersRepository.create(makeUser());

    expect(await userFind.execute("test-tester-id-1")).toEqual(
      expect.objectContaining({ id: "test-tester-id-1" }),
    );

    const changedUser = await userPassword.execute(
      "test-tester-id-1",
      "strongPassword",
    );

    expect(changedUser.createdAt !== changedUser.updatedAt).toBeTruthy();
  });
});
