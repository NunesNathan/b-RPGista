import { Module } from "@nestjs/common";
import { DatabaseModule } from "@infra/database/database.module";
import { UserCreate } from "./user-create";
import { UserFindMany } from "./user-find-many";
import { UserFind } from "./user-find";

@Module({
  imports: [DatabaseModule],
  providers: [UserCreate, UserFindMany, UserFind],
  exports: [DatabaseModule, UserCreate, UserFindMany, UserFind],
})
export class UserUseCasesModule {}
