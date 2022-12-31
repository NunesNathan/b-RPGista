import { Request } from "express";
import { User } from "@application/entities/user";

export interface AuthRequest extends Request {
  user: User;
}
