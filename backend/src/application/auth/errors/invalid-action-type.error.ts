import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidActionTypeError extends HttpException {
  constructor() {
    super("Invalid action type", HttpStatus.BAD_REQUEST);
  }
}
