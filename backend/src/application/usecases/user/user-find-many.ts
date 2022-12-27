import { Injectable } from "@nestjs/common";
import { UserRepository } from "@infra/http/repositories/user-repository";
import { User } from "@application/entities/user";

@Injectable()
export class UserFindMany {
  constructor(private userRepository: UserRepository) {}

  public async execute(): Promise<User[]> {
    return await this.userRepository.findMany();
  }
}
