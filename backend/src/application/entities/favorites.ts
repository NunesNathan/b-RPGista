export enum ContentType {
  CHARACTER = "character",
  THREAT = "threat",
  SKILL = "skill",
  PARANORMAL_POWER = "paranormalPower",
}

export interface Favorite {
  contentId: string;
  contentType: ContentType;
  favorited_at: Date;
}

export interface FavoriteProps {
  count: number;
  saved: Favorite[];
}

export class Favorites {
  private readonly favorites: FavoriteProps;

  private validator(favorite: FavoriteProps) {
    return typeof favorite === "object" && typeof favorite.count === "number";
  }

  constructor(favorites: string) {
    const parsed: FavoriteProps = JSON.parse(favorites);

    const isValidFavorites = this.validator(parsed);

    if (!isValidFavorites) {
      throw new Error("Invalid favorite");
    }

    this.favorites = parsed;
  }

  public get value(): string {
    return JSON.stringify(this.favorites);
  }

  public addFavorite(favorite: Favorite) {
    this.favorites.saved.push(favorite);
    this.favorites.count = this.favorites.saved.length;
  }

  public removeFavorite(contentId: string) {
    this.favorites.saved = this.favorites.saved.filter(
      (favorite) => favorite.contentId !== contentId,
    );
    this.favorites.count = this.favorites.saved.length;
  }

  public get count(): number {
    return this.favorites.count;
  }

  public get saved(): Favorite[] {
    return this.favorites.saved;
  }
}