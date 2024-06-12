import { TCar } from "./car.interfase";
import { Car } from "./car.model";

const createCarIntoDB = async (payload: TCar) => {
  const result = await Car.create(payload);
  return result;
};
const getAllCarFromDB = async () => {
  const result = await Car.find();
  return result;
};
const getSingleCarFromDB = async (id: string) => {
  const result = await Car.findById(id);
  return result;
};

const updateCarIntoDB = async (id: string, payload: Partial<TCar>) => {
  const result = await Car.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
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
