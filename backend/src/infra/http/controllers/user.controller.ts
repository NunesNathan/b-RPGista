import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { UserCreate } from "@application/usecases/user/user-create";
import { UserFindMany } from "@application/usecases/user/user-find-many";
import { CreateUserDto } from "../dtos/create-user-dto";
import { HttpFavorite, HttpUser } from "../viewmodels/user-view-model";
import { UserViews } from "@application/usecases/user/user-views";
import { UserFind } from "@application/usecases/user/user-find";
import { UserEmail } from "@application/usecases/user/user-email";
import { UserPassword } from "@application/usecases/user/user-password";
import { UserFavoriteList } from "@application/usecases/user/user-favorite-list";
import { Favorite } from "@application/entities/favorites";
import { AddFavorite } from "@application/usecases/user/user-add-favorite";
import { RemoveFavorite } from "@application/usecases/user/user-remove-favorite";
import { Replace } from "@helpers/replace";
import { IsPublic } from "@application/usecases/auth/decorators/is-public.decorator";

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
    private addFavorite: AddFavorite,
    private removeFavorite: RemoveFavorite,
  ) {}

  @Get()
  async getUsers(): Promise<HttpUser[]> {
    return await this.userFindMany.execute();
  }

  @Get(":id")
  async getUser(@Param("id") id: string): Promise<HttpUser> {
    return await this.userFind.execute(id);
  }

  @Get(":id/favorite_list")
  async getFavoriteList(@Param("id") id: string): Promise<HttpFavorite> {
    return await this.userFavoriteList.execute(id);
  }

  @IsPublic()
  @Post()
  async create(
    @Body() { email, username, password }: CreateUserDto,
  ): Promise<HttpUser> {
    return await this.userCreate.execute(email, username, password);
  }

  @Patch(":id/view")
  async addView(@Param("id") id: string): Promise<HttpUser> {
    return await this.userViews.execute(id);
  }

  @Patch(":id/email")
  async setEmail(
    @Param("id") id: string,
    @Body() { email },
  ): Promise<HttpUser> {
    return await this.userEmail.execute(id, email);
  }

  @Patch(":id/password")
  async setPassowrd(
    @Param("id") id: string,
    @Body() { password },
  ): Promise<HttpUser> {
    return await this.userPassowrd.execute(id, password);
  }

  @Patch(":id/add_favorite")
  async addNewFavorite(
    @Param("id") id: string,
    @Body() favorite: Replace<Favorite, { favorited_at?: Date }>,
  ): Promise<HttpFavorite> {
    return await this.addFavorite.execute(id, favorite);
  }

  @Patch(":id/remove_favorite")
  async removeAFavorite(
    @Param("id") id: string,
    @Body() { contentId },
  ): Promise<HttpFavorite> {
    return await this.removeFavorite.execute(id, contentId);
  }
}
