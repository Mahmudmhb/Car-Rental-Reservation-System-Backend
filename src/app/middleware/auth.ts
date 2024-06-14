import { NextFunction, Request, Response } from "express";
import catchAsync from "../utilits/catchAsync";
import AppError from "../Error/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { Tuser_role } from "../modules/User/user.interfase";

const auth = (...requiredRoles: Tuser_role[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "YYou have no access to this route"
      );
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_token as string
    ) as JwtPayload;

    const role = decoded.role;
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You have no access to this route"
      );
    }
    req.user = decoded as JwtPayload;
    next();
  });
};
export default auth;
