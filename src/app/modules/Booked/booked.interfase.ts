import mongoose, { Types } from "mongoose";

export type TBooked = {
  date: string;
  startTime: string;
  user?: mongoose.Schema.Types.ObjectId;
  carId: mongoose.Schema.Types.ObjectId;
  endTime?: string;
  totalCost?: number;
  isBooked?: "unconfirmed" | "confirmed";
};
