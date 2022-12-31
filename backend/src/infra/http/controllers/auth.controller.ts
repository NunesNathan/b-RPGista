import { Controller, HttpCode, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "@application/usecases/auth/auth.service";
import { IsPublic } from "@application/usecases/auth/decorators/is-public.decorator";
import { LocalAuthGuard } from "@application/usecases/auth/guards/local-auth.guard";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post("login")
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  async login(@Req() { user }) {
    return await this.authService.login(user);
  }
}
