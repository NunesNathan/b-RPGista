import { Module } from "@nestjs/common";
import { UserUseCasesModule } from "@application/usecases/user/user-usecases.module";
import { UserController } from "./user.controller";
import { AuthModule } from "@application/auth/auth.module";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "@application/usecases/auth/guards/jwt-auth.guard";

@Module({
  imports: [AuthModule, UserUseCasesModule],
  controllers: [UserController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class ControllersModule {}
