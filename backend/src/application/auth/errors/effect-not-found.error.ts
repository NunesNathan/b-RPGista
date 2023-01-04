import { HttpException, HttpStatus } from "@nestjs/common";

export class EffectNotFoundError extends HttpException {
  constructor() {
    super("Effect not founded", HttpStatus.NOT_FOUND);
  }
}
