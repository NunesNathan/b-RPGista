import { UserRepository } from "@infra/http/repositories/user-repository";
import {
  HttpFavorite,
  UserViewModel,
} from "@infra/http/viewmodels/user-view-model";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserFavoriteList {
  constructor(private userRepository: UserRepository) {}

  public async execute(id: string): Promise<HttpFavorite> {
    return UserViewModel.favoriteToHttp(
      id,
      await this.userRepository.findFavorites(id),
    );
  }
}
