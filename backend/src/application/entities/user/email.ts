import { InvalidEmailError } from "@application/auth/errors/invalid-email.error";

export class Email {
  private readonly email: string;

  private validator(email: string) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  }

  constructor(email: string) {
    const isValidEmail = this.validator(email);

    if (!isValidEmail) {
      throw new InvalidEmailError();
    }

    this.email = email;
  }

  public get value(): string {
    return this.email;
  }
}
