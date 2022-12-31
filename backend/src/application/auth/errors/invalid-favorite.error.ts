import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidFavoriteError extends HttpException {
  constructor() {
    super("Invalid favorite format", HttpStatus.BAD_REQUEST);
  }
}
