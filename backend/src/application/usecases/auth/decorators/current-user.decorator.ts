import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { HttpUser } from "@infra/http/viewmodels/user-view-model";
import { AuthRequest } from "../models/auth-request.types";

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): HttpUser => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    return request.user;
  },
);
