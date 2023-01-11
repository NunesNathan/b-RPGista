import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidEffectError extends HttpException {
  constructor() {
    super("Invalid effect", HttpStatus.BAD_REQUEST);
  }
}
