import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidCharacterNameError extends HttpException {
  constructor() {
    super("Invalid character name format", HttpStatus.BAD_REQUEST);
  }
}
