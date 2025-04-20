import { AppError } from "@/utils/AppError";
import { Request, Response, NextFunction } from "express";
import { authConfig } from "@/configs/auth";
import { verify } from "jsonwebtoken";

interface TokePayload {
  role: string;
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT token não informado", 401);
  }

  const [, token] = authHeader.split(" ");

  const { sub: user_id, role } = verify(
    token,
    authConfig.jwt.secret
  ) as TokePayload;

  request.user = {
    id: String(user_id),
    role,
  };

  return next();
}
