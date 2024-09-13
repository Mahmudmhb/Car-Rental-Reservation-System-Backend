import httpStatus from "http-status";
import catchAsync from "../../utilits/catchAsync";
import sendResponce from "../../utilits/sendResponce";
import { BookedService } from "./booked.service";
import { CarService } from "../Cars/car.service";

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
  console.log(req.user);
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

const returnBooked = catchAsync(async (req, res) => {
  const { bookingId: id } = req.body;
  const result = await BookedService.returnBookedIntoDB(id, req.body);
  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Car booked successfully",
    data: result,
  });
});
const deleteBooked = catchAsync(async (req, res) => {
  const { bookedId } = req.params;
  const result = await BookedService.deleteBookedFromDb(bookedId);
  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "My Booking deleted successfully",
    data: result,
  });
});
const updateBooked = catchAsync(async (req, res) => {
  const { bookedId } = req.params;
  const result = await BookedService.UpdatedBookedIntoDb(bookedId);
  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Book is approved successfully",
    data: result,
  });
});
const paymentCustomer = catchAsync(async (req, res) => {
  const orderData = req.body;
  const newOrder = await BookedService.orderPayment(orderData);
  sendResponce(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: " Book is approved successfully",
    data: newOrder,
  });
});
export const BookedController = {
  newBooked,
  getAllOrders,
  getMyAllOrders,
  returnBooked,
  deleteBooked,
  paymentCustomer,
  updateBooked,
};
