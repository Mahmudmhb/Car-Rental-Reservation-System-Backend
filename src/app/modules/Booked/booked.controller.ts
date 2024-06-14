import httpStatus from "http-status";
import catchAsync from "../../utilits/catchAsync";
import sendResponce from "../../utilits/sendResponce";
import { CarController } from "../Cars/car.controller";
import { BookedService } from "./booked.service";
import { User } from "../User/user.model";
import AppError from "../../Error/AppError";
import { Types } from "mongoose";

const newBooked = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await BookedService.newBookedIntoDB(user, req.body);
  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car booked successfully",
    data: result,
  });
});
const getAllOrders = catchAsync(async (req, res) => {
  // console.log("test", req.user);
  const result = await BookedService.getAllBookedFromDB();
  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "car retrived are successfully",
    data: result,
  });
});
const getMyAllOrders = catchAsync(async (req, res) => {
  // console.log("test", );
  const { email } = req.user;
  const result = await BookedService.getMYAllBookedFromDB(email);
  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "My Bookings retrieved successfully",
    data: result,
  });
});
//   const getSingleCar = catchAsync(async (req, res) => {
//     const { id } = req.params;
//     const result = await CarService.getSingleCarFromDB(id);
//     sendResponce(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: "car retrived is successfully",
//       data: result,
//     });
//   });
export const BookedController = {
  newBooked,
  getAllOrders,
  getMyAllOrders,
};
