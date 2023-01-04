import { Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "@infra/http/repositories/user-repository";
import {
  HttpUser,
  UserViewModel,
} from "@infra/http/viewmodels/user-view-model";

@Injectable()
export class UserFind {
  constructor(private userRepository: UserRepository) {}

  public async execute(id: string): Promise<HttpUser> {
    const findedUser = await this.userRepository.find(id);

    if (!findedUser) {
      throw new NotFoundException();
    }

    return UserViewModel.toHttp(findedUser);
  }
}
