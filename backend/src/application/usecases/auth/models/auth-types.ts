import { Request } from "express";
import { User } from "@application/entities/user";

export interface UserPayload {
  sub: string;
  email: string;
  username: string;
}

export interface JwtToken {
  access_token: string;
}

export interface UserFromJwtPayload {
  id: string;
  email: string;
  username: string;
}

export interface AuthRequest extends Request {
  user: User;
}
