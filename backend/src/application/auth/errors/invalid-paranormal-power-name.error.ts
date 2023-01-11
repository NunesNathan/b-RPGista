import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidParanormalPowerNameError extends HttpException {
  constructor() {
    super("Invalid paranormal power", HttpStatus.BAD_REQUEST);
  }
}
