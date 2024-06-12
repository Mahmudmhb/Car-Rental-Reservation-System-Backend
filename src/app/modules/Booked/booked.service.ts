import { TBooked } from "./booked.interfase";
import { Booked } from "./booked.model";

const newBookedIntoDB = async (payload: TBooked) => {
  const result = await Booked.create(payload);
  return result;
};
const getAllBookedFromDB = async () => {
  const result = await Booked.find().populate("Car");
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
};
