import { Module } from "@nestjs/common";
import { DatabaseModule } from "@infra/database/database.module";
import { UserCreate } from "./user-create";
import { UserFindMany } from "./user-find-many";
import { UserViews } from "./user-views";
import { UserFind } from "./user-find";
import { UserEmail } from "./user-email";
import { UserPassword } from "./user-password";

@Module({
  imports: [DatabaseModule],
  providers: [
    UserCreate,
    UserFindMany,
    UserFind,
    UserViews,
    UserEmail,
    UserPassword,
  ],
  exports: [
    DatabaseModule,
    UserCreate,
    UserFindMany,
    UserFind,
    UserViews,
    UserEmail,
    UserPassword,
  ],
})
export class UserUseCasesModule {}
