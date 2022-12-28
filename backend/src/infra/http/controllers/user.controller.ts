import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserCreate } from "@application/usecases/user/user-create";
import { UserFindMany } from "@application/usecases/user/user-find-many";
import { CreateUserDto } from "../dtos/create-user-dto";
import { UserViewModel } from "../viewmodels/user-view-model";

@Controller("users")
export class UserController {
  constructor(
    private userFindMany: UserFindMany,
    private userCreate: UserCreate,
  ) {}

  @Get()
  async getUsers() {
    return (await this.userFindMany.execute()).map(UserViewModel.toHttp);
  }

  @Post()
  async create(@Body() { email, username, password }: CreateUserDto) {
    return UserViewModel.toHttp(
      await this.userCreate.execute(email, username, password),
    );
  }
}
