import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "@application/usecases/auth/auth.service";
import { JwtStrategy } from "@application/usecases/auth/strategies/jwt.strategy";
import { LocalStrategy } from "@application/usecases/auth/strategies/local.strategy";
import { DatabaseModule } from "@infra/database/database.module";
import { AuthController } from "@infra/http/controllers/auth.controller";
import { LoginValidationMiddleware } from "./middlewares/login-validation.middleware";

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
  exports: [AuthService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginValidationMiddleware).forRoutes("login");
  }
}
