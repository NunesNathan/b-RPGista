import { Injectable } from "@nestjs/common";
import { Email } from "@application/entities/email";
import { Username } from "@application/entities/username";
import { UserRepository } from "@infra/http/repositories/user-repository";
import { User } from "@application/entities/user";

@Injectable()
export class UserCreate {
  constructor(private userRepository: UserRepository) {}

  async execute(
    email: string,
    username: string,
    password: string,
  ): Promise<User> {
    const user = new User({
      email: new Email(email),
      username: new Username(username),
      password,
    });

    return await this.userRepository.create(user);
  }
}
