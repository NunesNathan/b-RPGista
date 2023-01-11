import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidSkillNameError extends HttpException {
  constructor() {
    super("Invalid skill name", HttpStatus.BAD_REQUEST);
  }
}
