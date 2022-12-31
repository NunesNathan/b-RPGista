import { Favorites } from "@application/entities/favorites";
import { UserFactory } from "@test/factories/users-factory";
import { InMemoryUserRepository } from "@test/repositories/InMemoryUsersRepository";
import { AddFavorite } from "./user-add-favorite";
import { UserFind } from "./user-find";
import { RemoveFavorite } from "./user-remove-favorite";

describe("Remove favorite to user", () => {
  const makeUser = UserFactory.user;
  const makeFavorite = UserFactory.favorite;

  it("should be able to remove a favorite using id", async () => {
    const usersRepository = new InMemoryUserRepository();
    const userFind = new UserFind(usersRepository);
    const addFavorite = new AddFavorite(usersRepository);
    const removeFavorite = new RemoveFavorite(usersRepository);

    const user = await usersRepository.create(makeUser());

    expect(await userFind.execute(user.id)).toEqual(
      expect.objectContaining({ id: user.id }),
    );

    addFavorite.execute(user.id, makeFavorite());
    addFavorite.execute(
      user.id,
      makeFavorite({ contentId: "test-content-id-2" }),
    );

    removeFavorite.execute(user.id, "test-content-id-1");

    expect(
      await new Favorites((await userFind.execute(user.id)).favorites as string)
        .saved,
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          contentType: "skill",
        }),
      ]),
    );

    expect(
      await new Favorites((await userFind.execute(user.id)).favorites as string)
        .count,
    ).toEqual(1);
  });
});
