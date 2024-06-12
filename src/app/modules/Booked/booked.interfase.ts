import { Types } from "mongoose";

export type TBooked = {
  user?: Types.ObjectId;
  date: string;
  carId: Types.ObjectId;
  startTime: string;
  endTime?: string;
  totalCost: number;
  isBooked: "unconfirmed" | "confirmed";
};
