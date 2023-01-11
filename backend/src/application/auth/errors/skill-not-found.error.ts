import { HttpException, HttpStatus } from "@nestjs/common";

export class SkillNotFoundError extends HttpException {
  constructor() {
    super("Skill not founded", HttpStatus.NOT_FOUND);
  }
}
