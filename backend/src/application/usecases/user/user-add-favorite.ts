import { Injectable } from "@nestjs/common";
import { UserRepository } from "@infra/http/repositories/user-repository";
import { Favorite, Favorites } from "@application/entities/favorites";
import { Replace } from "@helpers/replace";

@Injectable()
export class AddFavorite {
  constructor(private userRepository: UserRepository) {}

  public async execute(
    id: string,
    { contentId, contentType }: Replace<Favorite, { favorited_at?: Date }>,
  ): Promise<Favorites> {
    const findedUser = await this.userRepository.find(id);

    if (!findedUser) {
      throw new Error(`User not found`);
    }

    const result = findedUser.addFavorite({
      contentId,
      contentType,
      favorited_at: new Date(),
    });

    await this.userRepository.update(findedUser);

    return result;
  }
}
