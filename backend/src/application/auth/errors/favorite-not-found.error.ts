import { HttpException, HttpStatus } from "@nestjs/common";

export class FavoriteNotFoundError extends HttpException {
  constructor() {
    super("Favorite not founded", HttpStatus.NOT_FOUND);
  }
}
