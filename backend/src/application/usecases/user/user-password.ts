import * as bcrypt from "bcrypt";
import { Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "@infra/http/repositories/user-repository";
import {
  HttpUser,
  UserViewModel,
} from "@infra/http/viewmodels/user-view-model";

@Injectable()
export class UserPassword {
  constructor(private userRepository: UserRepository) {}

  public async execute(id: string, password: string): Promise<HttpUser> {
    const findedUser = await this.userRepository.find(id);

    if (!findedUser) {
      throw new NotFoundException();
    }

    findedUser.changePassword(await bcrypt.hash(password, 10));

    await this.userRepository.update(findedUser);

    return UserViewModel.toHttp(findedUser);
  }
}
