import { User } from "../User/user.model";
import { TBooked } from "./booked.interfase";
import { Booked } from "./booked.model";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../../Error/AppError";
import httpStatus from "http-status";
import mongoose, { ObjectId } from "mongoose";

const newBookedIntoDB = async (user: JwtPayload, payload: TBooked) => {
  const filterLoginUser = await User.findOne({ email: user.email });
  // console.log(filterLoginUser);
  if (!filterLoginUser) {
    throw new AppError(httpStatus.NOT_FOUND, "user not Found");
  }
  const newUser = filterLoginUser._id as mongoose.Types.ObjectId | undefined;
  payload.user = newUser;
  // console.log(payload);
  const result = (
    await (await Booked.create(payload)).populate("user")
  ).populate("carId");
  // console.log(result);
  return result;
};
const getAllBookedFromDB = async () => {
  const result = await Booked.find().populate("carId").populate("user");
  return result;
};
const getMYAllBookedFromDB = async (email: string) => {
  // console.log(email);
  const filterLoginUser = await User.findOne({ email });
  // console.log(filterLoginUser);
  const { _id: user } = filterLoginUser;
  const result = await Booked.find({ user: user })
    .populate("carId")
    .populate("user");
  // console.log(result);
  return result;
};
const getSingleBookedFromDB = async (id: string) => {
  const result = await Booked.findById(id);
  return result;
};

export const BookedService = {
  getAllBookedFromDB,
  newBookedIntoDB,
  getSingleBookedFromDB,
  getMYAllBookedFromDB,
};
