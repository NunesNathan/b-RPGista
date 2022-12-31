import { HttpException, HttpStatus } from "@nestjs/common";

export class WrongCredentialsError extends HttpException {
  constructor(message = "User or password provided is incorrect.") {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}
