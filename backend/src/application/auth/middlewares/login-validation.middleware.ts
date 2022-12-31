import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { validate, ValidationError } from "class-validator";
import { LoginRequestBody } from "./models/login-request-body";

@Injectable()
export class LoginValidationMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const body = req.body;

    const loginRequestBody = new LoginRequestBody();
    loginRequestBody.email = body.email;
    loginRequestBody.password = body.password;

    const validations = await validate(loginRequestBody);

    if (validations.length) {
      throw new BadRequestException(
        validations.reduce((acc: any[], curr: ValidationError) => {
          return [
            ...acc,
            ...Object.values(curr.constraints as { [type: string]: string }),
          ];
        }, []),
      );
    }

    next();
  }
}
