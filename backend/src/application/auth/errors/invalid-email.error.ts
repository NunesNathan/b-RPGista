import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidEmailError extends HttpException {
  constructor() {
    super("Invalid email format", HttpStatus.BAD_REQUEST);
  }
}
