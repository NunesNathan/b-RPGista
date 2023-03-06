import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AuthModule } from "@application/auth/auth.module";
import { LoginValidationMiddleware } from "@application/auth/middlewares/login-validation.middleware";
import { DatabaseModule } from "@infra/database/database.module";
import { UserCreate } from "./user-create";
import { UserFindMany } from "./user-find-many";
import { addView } from "./user-views";
import { UserFind } from "./user-find";
import { UserEmail } from "./user-email";
import { UserPassword } from "./user-password";
import { UserFavoriteList } from "./user-favorite-list";
import { AddFavorite } from "./user-add-favorite";
import { RemoveFavorite } from "./user-remove-favorite";
import { UserDelete } from "./user-delete";

@Module({
  imports: [DatabaseModule, AuthModule],
  providers: [
    UserCreate,
    UserFindMany,
    UserFind,
    addView,
    UserEmail,
    UserPassword,
    UserFavoriteList,
    AddFavorite,
    RemoveFavorite,
    UserDelete,
  ],
  exports: [
    DatabaseModule,
    UserCreate,
    UserFindMany,
    UserFind,
    addView,
    UserEmail,
    UserPassword,
    UserFavoriteList,
    AddFavorite,
    RemoveFavorite,
    UserDelete,
  ],
})
export class UserUseCasesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginValidationMiddleware).forRoutes("delete_account");
  }
}
