import { HttpException, HttpStatus } from "@nestjs/common";

export class ParanormalPowerNotFoundError extends HttpException {
  constructor() {
    super("Paranormal power not founded", HttpStatus.NOT_FOUND);
  }
}
