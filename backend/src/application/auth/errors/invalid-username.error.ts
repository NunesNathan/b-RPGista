import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidUsernameError extends HttpException {
  constructor() {
    super("Invalid username format", HttpStatus.BAD_REQUEST);
  }
}
