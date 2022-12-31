import * as bcrypt from "bcrypt";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginRequestBody } from "@application/auth/middlewares/models/login-request-body";
import { UserRepository } from "@infra/http/repositories/user-repository";
import { HttpUser } from "@infra/http/viewmodels/user-view-model";

@Injectable()
export class UserDelete {
  constructor(private userRepository: UserRepository) {}

  public async execute(
    id: string,
    user: HttpUser,
    providedUser: LoginRequestBody,
  ): Promise<void> {
    const findedUser = await this.userRepository.find(id);

    if (!findedUser) {
      return;
    }

    if (
      id === user.id &&
      findedUser.email === providedUser.email &&
      user.email === providedUser.email &&
      (await bcrypt.compare(providedUser.password, findedUser.password))
    ) {
      await this.userRepository.delete(findedUser.email);
    }

    throw new UnauthorizedException();
  }
}
