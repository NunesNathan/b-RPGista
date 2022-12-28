import { randomUUID } from "node:crypto";
import { Replace } from "@helpers/replace";
import { Email } from "./email";
import { Username } from "./username";
import { Favorite, Favorites } from "./favorites";

export interface UserProps {
  id: string;
  email: Email;
  username: Username;
  password: string;
  views: number;
  favorites: Favorites;
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  private props: UserProps;

  constructor(
    props: Replace<
      UserProps,
      {
        id?: string;
        views?: number;
        favorites?: Favorites;
        createdAt?: Date;
        updatedAt?: Date;
      }
    >,
  ) {
    this.props = {
      ...props,
      id: props.id ?? randomUUID(),
      views: props.views ?? 0,
      favorites:
        props.favorites ??
        new Favorites(JSON.stringify({ count: 0, saved: [] })),
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  public get id(): string {
    return this.props.id;
  }

  public get email(): string {
    return this.props.email.value;
  }

  public changeEmail(email: string) {
    this.props.email = new Email(email);
    this.props.updatedAt = new Date();
  }

  public get username(): string {
    return this.props.username.value;
  }

  public get password(): string {
    return this.props.password;
  }

  public changePassword(password: string) {
    this.props.password = password;
    this.props.updatedAt = new Date();
  }

  public get views(): number {
    return this.props.views;
  }

  public addView() {
    this.props.views += 1;
  }

  public get favorites(): string {
    return this.props.favorites.value;
  }

  public get favoriteList(): Favorite[] {
    return this.props.favorites.saved;
  }

  public get favoritesCount(): number {
    return this.props.favorites.count;
  }

  public addFavorite(favorite: Favorite) {
    this.props.favorites.addFavorite(favorite);

    return this.props.favorites;
  }

  public removeFavorite(contentId: string) {
    this.props.favorites.removeFavorite(contentId);

    return this.props.favorites;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
