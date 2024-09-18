import { User } from "../User/user.model";
import { TBooked } from "./booked.interfase";
import { Booked } from "./booked.model";
import AppError from "../../Error/AppError";
import httpStatus from "http-status";
import { Car } from "../Cars/car.model";
import { calculationTotalDurationTime } from "./booked.utils";
import mongoose from "mongoose";
import { TUser } from "../User/user.interfase";
import { initialPayment } from "./Payment/payment.utlis";
interface TBookeded extends Document {
  carId: mongoose.Types.ObjectId;
  user?: mongoose.Types.ObjectId;
  [key: string]: any;
}
const newBookedIntoDB = async (
  user: Record<string, unknown>,
  payload: TBooked
) => {
  const filterLoginUser = await User.findOne({ email: user.email });
  if (!filterLoginUser) {
    throw new AppError(httpStatus.NOT_FOUND, "user not Found");
  }
  const newUser = filterLoginUser._id;
  payload.user = newUser as mongoose.Types.ObjectId;

  const filterCar = await Car.findOne({ _id: payload.carId });
  if (!filterCar) {
    throw new AppError(httpStatus.NOT_FOUND, "Car not Found");
  }
  const { _id } = filterCar;
  const statusUpdateCar = await Car.findByIdAndUpdate(
    _id,
    {
      status: "unavailable",
    },
    {
      new: true,
      runValidators: true,
    }
  );
  const result = (
    await (await Booked.create(payload)).populate("user")
  ).populate("carId");
  return result;
};

const getAllBookedFromDB = async () => {
  // console.log(query);
  // let carId = "";

  // if (query?.carId) {
  //   carId = query?.carId as string;
  // }

  // const searchVariable = ["name"];
  const result = await Booked.find().populate("carId").populate("user");
  // console.log(result);
  if (!result.length) {
    throw new AppError(httpStatus.NOT_FOUND, "No Data Found");
  }

  return result;
};
const getMYAllBookedFromDB = async (email: string) => {
  // console.log(email);
  const filterLoginUser = await User.findOne({ email });
  // console.log(filterLoginUser);
  if (!filterLoginUser) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const userId = filterLoginUser._id;
  const result = await Booked.find({ user: userId })
    .populate("carId")
    .populate("user");
  // console.log(result);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "No Data Found");
  }

  return result;
};

const getSingleBookedFromDB = async (id: string) => {
  const result = await Booked.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "No Data Found");
  }
  return result;
};

const returnBookedIntoDB = async (
  id: string,
  payload: Record<string, unknown>
) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const { bookingId, endTime } = payload as {
      bookingId: string;
      endTime: string;
    };

    const findBook = await Booked.findOne({ _id: bookingId }).session(session);
    console.log("find book", findBook?.payment.startTime);
    if (!findBook) {
      throw new AppError(httpStatus.NOT_FOUND, "Booking not found");
    }
    const startTime = findBook.payment.startTime;
    const { carId, date } = findBook;
    console.log("car id", startTime);

    // Convert date and startTime to a full DateTime string
    const startDateTime = new Date(startTime);
    const endDateTime = new Date(endTime);
    const findCar = await Car.findOneAndUpdate(
      { _id: carId },
      { status: "available" },
      { new: true, runValidators: true, session }
    );
    if (!findCar) {
      throw new AppError(httpStatus.NOT_FOUND, "Car not found");
    }
    const { pricePerHour } = findCar;

    const filterTotalCost = calculationTotalDurationTime(
      startDateTime.toISOString(),
      endDateTime.toISOString(),
      pricePerHour
    );
    payload.totalCost = filterTotalCost?.toFixed(2);

    const result = await Booked.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
      session,
    })
      .populate("user")
      .populate("carId");

    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export default returnBookedIntoDB;

const deleteBookedFromDb = async (id: string) => {
  const result = await Booked.deleteOne({ _id: id });
  return result;
};
const UpdatedBookedIntoDb = async (id: string) => {
  const result = await Booked.findByIdAndUpdate(
    id,
    {
      isBooked: "confirmed",
    },
    { new: true, runValidators: true }
  );
  return result;
};

const orderPayment = async (payload: any) => {
  const getPayment = payload;
  const totalCost = getPayment.totalCost;

  const transactionId = `TXN-${Date.now()}`;

  const order = await Booked.updateOne(
    { _id: getPayment._id },
    {
      user: getPayment.user,
      products: getPayment?.carId?.name,
      totalCost,
      status: "Pending",
      paymentStatus: "Pending",
      transactionId,
    }
  );
  const paymentData = {
    transactionId,
    totalCost,
    customerName: getPayment?.user?.name,
    custormarEmail: getPayment?.user?.email,
    custormarPhone: getPayment?.user?.phone,
  };
  const initialState = await initialPayment(paymentData);
  // console.log(initialState);
  return initialState;
};

export const BookedService = {
  getAllBookedFromDB,
  newBookedIntoDB,
  getSingleBookedFromDB,
  getMYAllBookedFromDB,
  returnBookedIntoDB,
  deleteBookedFromDb,
  UpdatedBookedIntoDb,
  orderPayment,
};
