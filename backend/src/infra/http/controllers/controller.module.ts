import { Module } from "@nestjs/common";
import { UserUseCasesModule } from "@application/usecases/user/user-usecases.module";
import { UserController } from "./user.controller";

@Module({
  imports: [UserUseCasesModule],
  controllers: [UserController],
})
export class ControllersModule {}
