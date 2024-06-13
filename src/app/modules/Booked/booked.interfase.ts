import mongoose, { Types } from "mongoose";

export type TBooked = {
  date: string;
  user?: mongoose.Schema.Types.ObjectId;
  carId: mongoose.Schema.Types.ObjectId;
  startTime: string;
  endTime?: string;
  totalCost?: number;
  isBooked?: "unconfirmed" | "confirmed";
};
