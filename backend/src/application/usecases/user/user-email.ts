import { UserRepository } from "@infra/http/repositories/user-repository";
import {
  HttpUser,
  UserViewModel,
} from "@infra/http/viewmodels/user-view-model";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class UserEmail {
  constructor(private userRepository: UserRepository) {}

  public async execute(id: string, email: string): Promise<HttpUser> {
    const findedUser = await this.userRepository.find(id);

    if (!findedUser) {
      throw new UnauthorizedException();
    }

    findedUser.changeEmail(email);

    await this.userRepository.update(findedUser);

    return UserViewModel.toHttp(findedUser);
  }
}
