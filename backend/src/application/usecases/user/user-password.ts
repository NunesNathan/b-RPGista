import { Injectable } from "@nestjs/common";
import { UserRepository } from "@infra/http/repositories/user-repository";
import { User } from "@application/entities/user";

@Injectable()
export class UserPassword {
  constructor(private userRepository: UserRepository) {}

  public async execute(id: string, password: string): Promise<User> {
    const findedUser = await this.userRepository.find(id);

    if (!findedUser) {
      throw new Error(`User not found`);
    }

    findedUser.changePassword(password);

    await this.userRepository.update(findedUser);

    return findedUser;
  }
}
