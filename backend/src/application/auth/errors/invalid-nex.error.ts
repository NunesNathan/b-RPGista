import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidNexError extends HttpException {
  constructor() {
    super(
      "Nex must be exactly 0, a multiple of 5 or exactly 99",
      HttpStatus.BAD_REQUEST,
    );
  }
}
