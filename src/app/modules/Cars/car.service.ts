import httpStatus from "http-status";
import AppError from "../../Error/AppError";
import { TBooked } from "../Booked/booked.interfase";
import { Booked } from "../Booked/booked.model";
import { TCar } from "./car.interfase";
import { Car } from "./car.model";

const createCarIntoDB = async (payload: TCar) => {
  const result = await Car.create(payload);
  return result;
};
const getAllCarFromDB = async () => {
  const result = await Car.find();
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "No Data Found");
  }
  return result;
};
const getSingleCarFromDB = async (id: string) => {
  const result = await Car.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "No Data Found");
  }
  return result;
};

const updateCarIntoDB = async (id: string, payload: Partial<TCar>) => {
  const result = await Car.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "No Data Found");
  }
  return result;
};

const deleteCarFromDB = async (id: string, payload: Partial<TCar>) => {
  const result = await Car.findByIdAndUpdate(id, {
    isDeleted: true,
    new: true,
    runValidators: true,
  });
  return result;
};
export const CarService = {
  createCarIntoDB,
  getAllCarFromDB,
  getSingleCarFromDB,
  updateCarIntoDB,
  deleteCarFromDB,
};
