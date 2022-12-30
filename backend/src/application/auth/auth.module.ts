import { Module } from "@nestjs/common";
import { LocalStrategy } from "@application/usecases/auth/strategies/local.strategy";
import { DatabaseModule } from "@infra/database/database.module";
import { AuthController } from "@infra/http/controllers/auth.controller";
import { AuthService } from "@application/usecases/auth/auth.service";

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
