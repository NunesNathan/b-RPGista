import { Favorite } from "@application/entities/favorites";
import { Replace } from "@helpers/replace";
import { UserRepository } from "@infra/http/repositories/user-repository";
import {
  HttpFavorite,
  UserViewModel,
} from "@infra/http/viewmodels/user-view-model";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class AddFavorite {
  constructor(private userRepository: UserRepository) {}

  public async execute(
    id: string,
    { contentId, contentType }: Replace<Favorite, { favorited_at?: Date }>,
  ): Promise<HttpFavorite> {
    const findedUser = await this.userRepository.find(id);

    if (!findedUser) {
      throw new UnauthorizedException();
    }

    const result = findedUser.addFavorite({
      contentId,
      contentType,
      favorited_at: new Date(),
    });

    await this.userRepository.update(findedUser);

    return UserViewModel.favoriteToHttp(id, result);
  }
}
