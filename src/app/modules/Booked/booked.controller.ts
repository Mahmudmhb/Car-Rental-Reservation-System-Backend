import httpStatus from "http-status";
import catchAsync from "../../utilits/catchAsync";
import sendResponce from "../../utilits/sendResponce";
import { CarController } from "../Cars/car.controller";
import { BookedService } from "./booked.service";

const newBooked = catchAsync(async (req, res) => {
  const result = await BookedService.newBookedIntoDB(req.body);
  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "car create successfully",
    data: result,
  });
});
const getAllOrders = catchAsync(async (req, res) => {
  const result = await BookedService.getAllBookedFromDB();
  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "car retrived are successfully",
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
};
