import { Injectable } from "@nestjs/common";
import { UserRepository } from "@infra/http/repositories/user-repository";
import { Favorites } from "@application/entities/favorites";

@Injectable()
export class UserFavoriteList {
  constructor(private userRepository: UserRepository) {}

  public async execute(id: string): Promise<Favorites> {
    return await this.userRepository.findFavorites(id);
  }
}
