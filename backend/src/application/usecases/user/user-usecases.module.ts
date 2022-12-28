import { Module } from "@nestjs/common";
import { DatabaseModule } from "@infra/database/database.module";
import { UserCreate } from "./user-create";
import { UserFindMany } from "./user-find-many";
import { UserViews } from "./user-views";
import { UserFind } from "./user-find";

@Module({
  imports: [DatabaseModule],
  providers: [UserCreate, UserFindMany, UserFind, UserViews],
  exports: [DatabaseModule, UserCreate, UserFindMany, UserFind, UserViews],
})
export class UserUseCasesModule {}
