export class Username {
  private readonly userName: string;

  private validator(userName: string) {
    return userName.length >= 4 && userName.length <= 16;
  }

  constructor(userName: string) {
    const isValidUserName = this.validator(userName);

    if (!isValidUserName) {
      throw new Error("Invalid user name");
    }

    this.userName = userName;
  }

  public get value(): string {
    return this.userName;
  }
}
