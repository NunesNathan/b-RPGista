import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { UserCreate } from "@application/usecases/user/user-create";
import { UserFindMany } from "@application/usecases/user/user-find-many";
import { CreateUserDto } from "../dtos/create-user-dto";
import { UserViewModel } from "../viewmodels/user-view-model";
import { UserViews } from "@application/usecases/user/user-views";
import { UserFind } from "@application/usecases/user/user-find";

@Controller("users")
export class UserController {
  constructor(
    private userFindMany: UserFindMany,
    private userCreate: UserCreate,
    private userFind: UserFind,
    private userViews: UserViews,
  ) {}

  @Get()
  async getUsers() {
    return (await this.userFindMany.execute()).map(UserViewModel.toHttp);
  }

  @Get(":id")
  async getUser(@Param("id") id: string) {
    return UserViewModel.toHttp(await this.userFind.execute(id));
  }

  @Post()
  async create(@Body() { email, username, password }: CreateUserDto) {
    return UserViewModel.toHttp(
      await this.userCreate.execute(email, username, password),
    );
  }

  @Patch(":id/view")
  async addView(@Param("id") id: string) {
    return UserViewModel.toHttp(await this.userViews.execute(id));
  }
}
