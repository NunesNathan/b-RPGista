import { LocalStrategy } from "@application/usecases/auth/strategies/local.strategy";
import { Module } from "@nestjs/common";
import { AuthController } from "../../infra/http/controllers/auth.controller";
import { AuthService } from "../usecases/auth/auth.service";

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
