import { Module } from "@nestjs/common";
import { DatabaseModule } from "@infra/database/database.module";
import { UserCreate } from "./user-create";
import { UserFindMany } from "./user-find-many";
import { UserViews } from "./user-views";
import { UserFind } from "./user-find";
import { UserEmail } from "./user-email";
import { UserPassword } from "./user-password";
import { UserFavoriteList } from "./user-favorite-list";
import { AddFavorite } from "./user-add-favorite";

@Module({
  imports: [DatabaseModule],
  providers: [
    UserCreate,
    UserFindMany,
    UserFind,
    UserViews,
    UserEmail,
    UserPassword,
    UserFavoriteList,
    AddFavorite,
  ],
  exports: [
    DatabaseModule,
    UserCreate,
    UserFindMany,
    UserFind,
    UserViews,
    UserEmail,
    UserPassword,
    UserFavoriteList,
    AddFavorite,
  ],
})
export class UserUseCasesModule {}
