import { makeUser } from "@test/factories/users-factory";
import { InMemoryUserRepository } from "@test/repositories/InMemoryUsersRepository";
import { UserFind } from "./user-find";
import { UserPassword } from "./user-password";

describe("Change user password", () => {
  it("should be able to change a user password using id", async () => {
    const usersRepository = new InMemoryUserRepository();
    const userFind = new UserFind(usersRepository);
    const userPassword = new UserPassword(usersRepository);

    await usersRepository.create(makeUser());

    expect(await userFind.execute("test-tester-id-1")).toEqual(
      expect.objectContaining({ id: "test-tester-id-1" }),
    );

    userPassword.execute("test-tester-id-1", "strongPassword");

    expect(await userFind.execute("test-tester-id-1")).toEqual(
      expect.objectContaining({ password: "strongPassword" }),
    );
  });
});
