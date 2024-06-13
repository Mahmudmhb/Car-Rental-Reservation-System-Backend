import httpStatus from "http-status";
import catchAsync from "../../utilits/catchAsync";
import sendResponce from "../../utilits/sendResponce";
import { AuthService } from "./auth.service";
import config from "../../config";

const registerUser = catchAsync(async (req, res) => {
  const result = await AuthService.register(req.body);
  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User register successfully",
    data: result,
  });
});
const userLogin = catchAsync(async (req, res) => {
  const { accessRefreashToken, accessToken } = await AuthService.loginUser(
    req.body
  );

  res.cookie("refreshToken", accessRefreashToken, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
  });
  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User login successfully",
    data: { accessToken },
  });
});

export const AuthControllers = {
  registerUser,
  userLogin,
};
