import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { UserRepository } from "@infra/http/repositories/user-repository";
import { UserViewModel } from "@infra/http/viewmodels/user-view-model";

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}
  login(username: string, password: string) {
    throw new Error("Method not implemented.");
  }

  async validateUser(email: string, password: string) {
    const findedUser = await this.userRepository.findByEmail(email);

    if (findedUser) {
      if (await bcrypt.compare(password, findedUser.password)) {
        return UserViewModel.toHttp(findedUser);
      }
    }

    throw new Error("User or password provided is incorrect.");
  }
}
