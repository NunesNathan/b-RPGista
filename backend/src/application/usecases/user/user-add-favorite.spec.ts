import { ContentType, Favorites } from "@application/entities/user/favorites";
import { UserFactory } from "@test/factories/users-factory";
import { InMemoryUserRepository } from "@test/repositories/InMemoryUsersRepository";
import { AddFavorite } from "./user-add-favorite";
import { UserFind } from "./user-find";

describe("Add favorite to user", () => {
  const makeUser = UserFactory.user;
  const makeFavorite = UserFactory.favorite;

  it("should be able to add a favorite using id", async () => {
    const usersRepository = new InMemoryUserRepository();
    const userFind = new UserFind(usersRepository);
    const addFavorite = new AddFavorite(usersRepository);

    const user = await usersRepository.create(makeUser());

    expect(await userFind.execute(user.id)).toEqual(
      expect.objectContaining({ id: user.id }),
    );

    addFavorite.execute(user.id, makeFavorite());
    addFavorite.execute(user.id, makeFavorite());

    expect(
      await new Favorites((await userFind.execute(user.id)).favorites as string)
        .saved,
    ).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          contentType: ContentType.SKILL,
        }),
        expect.objectContaining({
          contentType: ContentType.SKILL,
        }),
      ]),
    );

    expect(
      await new Favorites((await userFind.execute(user.id)).favorites as string)
        .count,
    ).toEqual(2);
  });
});
