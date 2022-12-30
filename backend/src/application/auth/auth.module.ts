import { Module } from "@nestjs/common";
import { LocalStrategy } from "@application/usecases/auth/strategies/local.strategy";
import { DatabaseModule } from "@infra/database/database.module";
import { AuthController } from "@infra/http/controllers/auth.controller";
import { AuthService } from "@application/usecases/auth/auth.service";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "@application/usecases/auth/strategies/jwt.strategy";

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
