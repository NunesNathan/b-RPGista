import { HttpException, HttpStatus } from "@nestjs/common";

export class PrerequisiteNotFoundError extends HttpException {
  constructor() {
    super("Prerequisite not founded", HttpStatus.NOT_FOUND);
  }
}
