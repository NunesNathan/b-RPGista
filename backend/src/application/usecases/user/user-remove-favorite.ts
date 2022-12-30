import { Injectable } from "@nestjs/common";
import { UserRepository } from "@infra/http/repositories/user-repository";
import { Favorites } from "@application/entities/favorites";

@Injectable()
export class RemoveFavorite {
  constructor(private userRepository: UserRepository) {}

  public async execute(id: string, contentId: string): Promise<Favorites> {
    const findedUser = await this.userRepository.find(id);

    if (!findedUser) {
      throw new Error(`User not found`);
    }

    const result = findedUser.removeFavorite(contentId);

    await this.userRepository.update(findedUser);

    return result;
  }
}
