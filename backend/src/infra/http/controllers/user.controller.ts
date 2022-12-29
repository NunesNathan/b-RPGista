import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { UserCreate } from "@application/usecases/user/user-create";
import { UserFindMany } from "@application/usecases/user/user-find-many";
import { CreateUserDto } from "../dtos/create-user-dto";
import { UserViewModel } from "../viewmodels/user-view-model";
import { UserViews } from "@application/usecases/user/user-views";
import { UserFind } from "@application/usecases/user/user-find";
import { UserEmail } from "@application/usecases/user/user-email";
import { UserPassword } from "@application/usecases/user/user-password";
import { UserFavoriteList } from "@application/usecases/user/user-favorite-list";

@Controller("users")
export class UserController {
  constructor(
    private userFindMany: UserFindMany,
    private userCreate: UserCreate,
    private userFind: UserFind,
    private userViews: UserViews,
    private userEmail: UserEmail,
    private userPassowrd: UserPassword,
    private userFavoriteList: UserFavoriteList,
  ) {}

  @Get()
  async getUsers() {
    return (await this.userFindMany.execute()).map(UserViewModel.toHttp);
  }

  @Get(":id")
  async getUser(@Param("id") id: string) {
    return UserViewModel.toHttp(await this.userFind.execute(id));
  }

  @Get(":id/favorite_list")
  async getFavoriteList(@Param("id") id: string) {
    return UserViewModel.favoriteToHttp(
      id,
      await this.userFavoriteList.execute(id),
    );
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

  @Patch(":id/email")
  async setEmail(@Param("id") id: string, @Body() { email }) {
    return UserViewModel.toHttp(await this.userEmail.execute(id, email));
  }

  @Patch(":id/password")
  async setPassowrd(@Param("id") id: string, @Body() { password }) {
    return UserViewModel.toHttp(await this.userPassowrd.execute(id, password));
  }
}
