import { UserFactory } from "@test/factories/users.factory";
import { InMemoryUsersRepository } from "@test/repositories/In-memory-users.repository";
import { UserFind } from "./user-find";
import { addView } from "./user-views";

describe("Add view to user", () => {
  const makeUser = UserFactory.user;

  it("should be able to get a user using id", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const userFind = new UserFind(usersRepository);
    const userViews = new addView(usersRepository);

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
