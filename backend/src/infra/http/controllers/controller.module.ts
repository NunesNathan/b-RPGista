import { Module } from "@nestjs/common";
import { UserUseCasesModule } from "@application/usecases/user/user-usecases.module";
import { UserController } from "./user.controller";
import { AuthModule } from "@application/auth/auth.module";

@Module({
  imports: [AuthModule, UserUseCasesModule],
  controllers: [UserController],
})
export class ControllersModule {}
