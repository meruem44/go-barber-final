import { Request, Response, NextFunction, request } from "express";
import { verify } from "jsonwebtoken";
import { authConfig } from "@config/auth";

import { AppError } from "@shared/errors/AppError";

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

function ensureAuthenticate(
  resquest: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = resquest.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT token is missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, authConfig.secret);

    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError("Invalid JWT token", 401);
  }
}

export { ensureAuthenticate };
