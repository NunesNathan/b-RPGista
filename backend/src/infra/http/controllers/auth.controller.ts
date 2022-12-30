import { AuthService } from "@application/usecases/auth/auth.service";
import { LocalAuthGuard } from "@application/usecases/auth/guards/local-auth.guard";
import { Body, Controller, HttpCode, Post, UseGuards } from "@nestjs/common";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  async login(
    @Body() { username, password }: { username: string; password: string },
  ) {
    return await this.authService.login(username, password);
  }
}
