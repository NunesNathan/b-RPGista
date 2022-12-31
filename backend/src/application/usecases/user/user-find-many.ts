import { Injectable } from "@nestjs/common";
import { UserRepository } from "@infra/http/repositories/user-repository";
import {
  HttpUser,
  UserViewModel,
} from "@infra/http/viewmodels/user-view-model";

@Injectable()
export class UserFindMany {
  constructor(private userRepository: UserRepository) {}

  public async execute(): Promise<HttpUser[]> {
    return (await this.userRepository.findMany()).map(UserViewModel.toHttp);
  }
}
