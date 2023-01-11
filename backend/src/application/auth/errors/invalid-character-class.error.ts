import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidCharacterClassError extends HttpException {
  constructor() {
    super("Invalid character class", HttpStatus.BAD_REQUEST);
  }
}
