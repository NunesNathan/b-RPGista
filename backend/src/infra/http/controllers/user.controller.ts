import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { CurrentUser } from "@application/usecases/auth/decorators/current-user.decorator";
import { IsPublic } from "@application/usecases/auth/decorators/is-public.decorator";
import { LocalStrategy } from "@application/usecases/auth/strategies/local.strategy";
import { LoginRequestBody } from "@application/auth/middlewares/models/login-request-body";
import { Favorite } from "@application/entities/user/favorites";
import { AddFavorite } from "@application/usecases/user/user-add-favorite";
import { UserCreate } from "@application/usecases/user/user-create";
import { UserDelete } from "@application/usecases/user/user-delete";
import { UserEmail } from "@application/usecases/user/user-email";
import { UserFavoriteList } from "@application/usecases/user/user-favorite-list";
import { UserFindMany } from "@application/usecases/user/user-find-many";
import { UserFind } from "@application/usecases/user/user-find";
import { UserPassword } from "@application/usecases/user/user-password";
import { RemoveFavorite } from "@application/usecases/user/user-remove-favorite";
import { addView } from "@application/usecases/user/user-views";
import { Replace } from "@helpers/replace";
import { CreateUserDto } from "../dtos/create-user-dto";
import { HttpFavorite, HttpUser } from "../viewmodels/user-view-model";

@Controller("users")
export class UserController {
  constructor(
    private userFindMany: UserFindMany,
    private userCreate: UserCreate,
    private userFind: UserFind,
    private userViews: addView,
    private userEmail: UserEmail,
    private userPassowrd: UserPassword,
    private userFavoriteList: UserFavoriteList,
    private addFavorite: AddFavorite,
    private removeFavorite: RemoveFavorite,
    private userDelete: UserDelete,
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
  async createUser(
    @Body() { email, username, password }: CreateUserDto,
  ): Promise<HttpUser> {
    return await this.userCreate.execute(email, username, password);
  }

  @Patch(":id/add_view")
  async addView(@Param("id") id: string): Promise<HttpUser> {
    return await this.userViews.execute(id);
  }

  @Patch(":id/change_email")
  async changeEmail(
    @Param("id") id: string,
    @Body() { email }: { email: string },
  ): Promise<HttpUser> {
    return await this.userEmail.execute(id, email);
  }

  @Patch(":id/change_password")
  async changePassword(
    @Param("id") id: string,
    @Body() { password }: { password: string },
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
    @Body() { contentId }: { contentId: string },
  ): Promise<HttpFavorite> {
    return await this.removeFavorite.execute(id, contentId);
  }

  @Delete(":id/delete_account")
  @UseGuards(LocalStrategy)
  async deleteUser(
    @Param("id") id: string,
    @CurrentUser() user: HttpUser,
    @Body() providedUser: LoginRequestBody,
  ): Promise<void> {
    await this.userDelete.execute(id, user, providedUser);
  }
}
