import * as bcrypt from "bcrypt";
import { Injectable } from "@nestjs/common";
import { Email } from "@application/entities/email";
import { User } from "@application/entities/user";
import { Username } from "@application/entities/username";
import { UserRepository } from "@infra/http/repositories/user-repository";
import {
  HttpUser,
  UserViewModel,
} from "@infra/http/viewmodels/user-view-model";

@Injectable()
export class UserCreate {
  constructor(private userRepository: UserRepository) {}

  async execute(
    email: string,
    username: string,
    password: string,
  ): Promise<HttpUser> {
    const user = new User({
      email: new Email(email),
      username: new Username(username),
      password: await bcrypt.hash(password, 10),
    });

    return UserViewModel.toHttp(await this.userRepository.create(user));
  }
}
