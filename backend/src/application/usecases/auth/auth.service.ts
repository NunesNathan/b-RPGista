import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { UserRepository } from "@infra/http/repositories/user-repository";
import {
  HttpUser,
  UserViewModel,
} from "@infra/http/viewmodels/user-view-model";
import { JwtService } from "@nestjs/jwt";
import { JwtToken, UserPayload } from "./models/auth-types";
import { WrongCredentialsError } from "@application/auth/errors/wrong-credentials.error";

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  login(validUser: HttpUser): JwtToken {
    const payload: UserPayload = {
      sub: validUser.id,
      email: validUser.email,
      username: validUser.username,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string) {
    const findedUser = await this.userRepository.findByEmail(email);

    if (findedUser) {
      if (await bcrypt.compare(password, findedUser.password)) {
        return UserViewModel.toHttp(findedUser);
      }

      throw new WrongCredentialsError(findedUser.updatedAt.toDateString());
    }

    throw new WrongCredentialsError();
  }
}
