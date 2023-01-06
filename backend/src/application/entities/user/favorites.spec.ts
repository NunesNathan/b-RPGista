import { FavoriteNotFoundError } from "@application/auth/errors/favorite-not-found.error";
import { ContentType, Favorites } from "./favorites";

describe("Favorite value object", () => {
  const favoriteValue = new Favorites('{"count":0,"saved":[]}');

  it("should be able to create an instance", () => {
    expect(favoriteValue.count).toBe(0);
    expect(favoriteValue.saved).toEqual([]);
    expect(favoriteValue.value).toEqual('{"count":0,"saved":[]}');
  });

  it("should be able to add a favorite", () => {
    favoriteValue.addFavorite({
      contentId: "1",
      contentType: ContentType.SKILL,
      favorited_at: new Date(),
    });

    expect(favoriteValue.count).toBe(1);
    expect(favoriteValue.saved).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          contentId: "1",
        }),
      ]),
    );
  });

  it("should be able to remove a favorite", () => {
    favoriteValue.removeFavorite("1");

    expect(favoriteValue.count).toBe(0);
    expect(favoriteValue.saved).toEqual([]);
  });

  it("should be disable to delete a not founded favorite", () => {
    expect(() => favoriteValue.removeFavorite("3")).toThrow(
      FavoriteNotFoundError,
    );
    expect(() => favoriteValue.removeFavorite("3")).toThrow(
      "Favorite not found",
    );
  });
});
