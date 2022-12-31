import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserRepository } from "@infra/http/repositories/user-repository";
import {
  HttpUser,
  UserViewModel,
} from "@infra/http/viewmodels/user-view-model";

@Injectable()
export class addView {
  constructor(private userRepository: UserRepository) {}

  public async execute(id: string): Promise<HttpUser> {
    const findedUser = await this.userRepository.find(id);

    if (!findedUser) {
      throw new UnauthorizedException();
    }

    findedUser.addView();

    await this.userRepository.update(findedUser);

    return UserViewModel.toHttp(findedUser);
  }
}
