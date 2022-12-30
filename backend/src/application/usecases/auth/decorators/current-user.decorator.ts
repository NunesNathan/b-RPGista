import { HttpUser } from "@infra/http/viewmodels/user-view-model";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { AuthRequest } from "../models/auth-types";

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): HttpUser => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    return request.user;
  },
);
