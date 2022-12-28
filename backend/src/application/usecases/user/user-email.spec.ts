import { makeUser } from "@test/factories/users-factory";
import { InMemoryUserRepository } from "@test/repositories/InMemoryUsersRepository";
import { UserFind } from "./user-find";
import { UserEmail } from "./user-email";

describe("Change user email", () => {
  it("should be able to change a user email using id", async () => {
    const usersRepository = new InMemoryUserRepository();
    const userFind = new UserFind(usersRepository);
    const userEmail = new UserEmail(usersRepository);

    await usersRepository.create(makeUser());

    expect(await userFind.execute("test-tester-id-1")).toEqual(
      expect.objectContaining({ id: "test-tester-id-1" }),
    );

    userEmail.execute("test-tester-id-1", "test@tester.com");

    expect(await userFind.execute("test-tester-id-1")).toEqual(
      expect.objectContaining({ email: "test@tester.com" }),
    );
  });
});
