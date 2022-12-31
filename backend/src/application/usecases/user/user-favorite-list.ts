import { Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "@infra/http/repositories/user-repository";
import {
  HttpFavorite,
  UserViewModel,
} from "@infra/http/viewmodels/user-view-model";

@Injectable()
export class UserFavoriteList {
  constructor(private userRepository: UserRepository) {}

  public async execute(id: string): Promise<HttpFavorite> {
    const findedUserFavorites = await this.userRepository.findFavorites(id);

    if (!findedUserFavorites) {
      throw new NotFoundException();
    }

    return UserViewModel.favoriteToHttp(id, findedUserFavorites);
  }
}
