import { Request } from "express";
import { User } from "@application/entities/user/user";

export interface AuthRequest extends Request {
  user: User;
}
