import * as bcrypt from "bcrypt";
import { LoginRequestBody } from "@application/auth/middlewares/models/login-request-body";
import { HttpUser } from "@infra/http/viewmodels/user-view-model";
import { UserFactory } from "@test/factories/users-factory";
import { InMemoryUserRepository } from "@test/repositories/InMemoryUsersRepository";
import { UserDelete } from "./user-delete";
import { UserFindMany } from "./user-find-many";

describe("Delete user", () => {
  beforeAll(async () => {
    const bcryptCompare = jest.fn().mockResolvedValue(true);
    (bcrypt.compare as jest.Mock) = bcryptCompare;
  });
  const makeUser = UserFactory.user;

  it("should be able to delete a user", async () => {
    const usersRepository = new InMemoryUserRepository();
    const userFindMany = new UserFindMany(usersRepository);
    const userDelete = new UserDelete(usersRepository);

    const user = await usersRepository.create(makeUser());

    expect(await userFindMany.execute()).toHaveLength(1);
    expect(await userFindMany.execute()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: "test-tester-id-1" }),
      ]),
    );

    await userDelete.execute(
      "test-tester-id-1",
      {
        id: user.id,
        username: user.username,
        email: user.email,
        views: user.views,
        favorites: user.favorites,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      } as HttpUser,
      {
        email: user.email,
        password: user.password,
      } as LoginRequestBody,
    );

    expect(await userFindMany.execute()).toHaveLength(0);
  });
});
