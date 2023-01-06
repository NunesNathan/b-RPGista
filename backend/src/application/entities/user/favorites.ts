import { Prisma } from "@prisma/client";
import { InvalidFavoriteError } from "@application/auth/errors/invalid-favorite.error";
import { FavoriteNotFoundError } from "@application/auth/errors/favorite-not-found.error";

export enum ContentType {
  CHARACTER = "CHARACTER",
  THREAT = "THREAT",
  SKILL = "SKILL",
  PARANORMAL_POWER = "PARANORMAL_POWER",
}

export interface Favorite {
  contentId: string;
  contentType: ContentType;
  favorited_at: Date;
}

export interface FavoritesProps {
  count: number;
  saved: Favorite[];
}

export class Favorites {
  private readonly props: FavoritesProps;

  constructor(favorites: string) {
    const parsed: FavoritesProps = JSON.parse(favorites);

    const isValidFavorites = this.validator(parsed);

    if (!isValidFavorites) {
      throw new InvalidFavoriteError();
    }

    this.props = parsed;
  }

  private validator(favorite: FavoritesProps) {
    return typeof favorite === "object" && typeof favorite.count === "number";
  }

  public get value(): Prisma.JsonValue {
    return JSON.stringify(this.props);
  }

  public addFavorite(favorite: Favorite) {
    if (
      Object.values(ContentType).includes(
        favorite.contentType.toUpperCase() as ContentType,
      )
    ) {
      this.props.saved.push(favorite);
      this.props.count = this.props.saved.length;
    } else {
      throw new InvalidFavoriteError();
    }
  }

  public removeFavorite(contentId: string) {
    let hasChanged = false;

    this.props.saved = this.props.saved.filter((favorite) => {
      if (favorite.contentId !== contentId) {
        return favorite;
      }
      hasChanged = true;
    });

    if (!hasChanged) {
      throw new FavoriteNotFoundError();
    }

    this.props.count = this.props.saved.length;
  }

  public get count(): number {
    return this.props.count;
  }

  public get saved(): Favorite[] {
    return this.props.saved;
  }
}
