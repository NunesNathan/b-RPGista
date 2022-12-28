import { Injectable } from "@nestjs/common";
import { UserRepository } from "@infra/http/repositories/user-repository";
import { User } from "@application/entities/user";

@Injectable()
export class UserViews {
  constructor(private userRepository: UserRepository) {}

  public async execute(id: string): Promise<User> {
    const findedUser = await this.userRepository.find(id);

    if (!findedUser) {
      throw new Error(`User not found`);
    }

    findedUser.addView();

    await this.userRepository.update(findedUser);

    return findedUser;
  }
}
