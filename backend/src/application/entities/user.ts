import { randomUUID } from "node:crypto";
import { Replace } from "@helpers/replace";
import { Email } from "./email";
import { Username } from "./username";

export interface UserProps {
  id: string;
  email: Email;
  username: Username;
  password: string;
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
        createdAt?: Date;
        updatedAt?: Date;
      }
    >,
  ) {
    this.props = {
      ...props,
      id: props.id ?? randomUUID(),
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

  public set email(email: string) {
    this.props.email = new Email(email);
    this.props.updatedAt = new Date();
  }

  public get username(): string {
    return this.props.username.value;
  }

  public get password(): string {
    return this.props.password;
  }

  public set password(password: string) {
    this.props.password = password;
    this.props.updatedAt = new Date();
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
