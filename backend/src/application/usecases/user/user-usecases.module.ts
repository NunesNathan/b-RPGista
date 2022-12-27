import { Module } from "@nestjs/common";
import { DatabaseModule } from "@infra/database/database.module";
import { UserCreate } from "./user-create";
import { UserFindMany } from "./user-find-many";

@Module({
  imports: [DatabaseModule],
  providers: [UserCreate, UserFindMany],
  exports: [DatabaseModule, UserCreate, UserFindMany],
})
export class UserUseCasesModule {}
