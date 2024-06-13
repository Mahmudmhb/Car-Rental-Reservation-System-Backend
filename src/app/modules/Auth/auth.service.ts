import httpStatus from "http-status";
import AppError from "../../Error/AppError";
import { TUser } from "../User/user.interfase";
import { User } from "../User/user.model";
import { TUserLogin } from "./auth.interfase";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config";

const register = async (payload: TUser) => {
  const user = await User.findOne({ email: payload.email });
  if (user) {
    throw new AppError(httpStatus.CONFLICT, "User alray exists");
  }
  payload.role = payload.role;
  const newUser = await User.create(payload);
  return newUser;
};

const loginUser = async (payload: TUserLogin) => {
  const user = await User.findOne({ email: payload.email }).select("password");
  if (!user) {
    throw new AppError(httpStatus.CONFLICT, "User not found");
  }
  const isPasswordExsits = async (
    newPassword: string,
    hashPassword: string
  ) => {
    const isMatched = await bcryptjs.compare(newPassword, hashPassword);
    return isMatched;
  };
  const passwordMatched = await isPasswordExsits(
    payload.password,
    user.password
  );
  if (!passwordMatched) {
    throw new AppError(httpStatus.CONFLICT, "wrong password !");
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_token as string, {
    expiresIn: "1d",
  });
  const accessRefreashToken = jwt.sign(
    jwtPayload,
    config.jwt_refresh_token as string,
    {
      expiresIn: "7d",
    }
  );
  return {
    accessToken,
    accessRefreashToken,
  };
};

export const AuthService = {
  register,
  loginUser,
};
