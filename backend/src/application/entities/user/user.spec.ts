import { UserFactory } from "@test/factories/users-factory";

describe("User entity", () => {
  const user = UserFactory.user();

  it("should be able to create an instance", () => {
    expect(user).toBeTruthy();
    expect(user.id).toBeDefined();
    expect(user.email).toEqual("test@test.com");
    expect(user.username).toEqual("test");
    expect(user.password).toEqual("test");
    expect(user.views).toEqual(0);
    expect(user.favorites).toEqual('{"count":0,"saved":[]}');
    expect(user.favoriteList).toEqual([]);
    expect(user.favoritesCount).toEqual(0);
    expect(user.createdAt).toBeInstanceOf(Date);
    expect(user.updatedAt).toBeInstanceOf(Date);
  });

  it("should be able to update an instance", () => {
    user.changeEmail("test2@test.com");
    expect(user.email).toEqual("test2@test.com");

    user.changePassword("password2");
    expect(user.password).toEqual("password2");
  });

  it("should be able to add a view", () => {
    user.addView();

    expect(user.views).toBe(1);
  });
});
