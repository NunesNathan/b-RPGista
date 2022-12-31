import { UserRepository } from "@infra/http/repositories/user-repository";
import {
  HttpFavorite,
  UserViewModel,
} from "@infra/http/viewmodels/user-view-model";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class RemoveFavorite {
  constructor(private userRepository: UserRepository) {}

  public async execute(id: string, contentId: string): Promise<HttpFavorite> {
    const findedUser = await this.userRepository.find(id);

    if (!findedUser) {
      throw new UnauthorizedException();
    }

    const result = findedUser.removeFavorite(contentId);

    await this.userRepository.update(findedUser);

    return UserViewModel.favoriteToHttp(id, result);
  }
}
