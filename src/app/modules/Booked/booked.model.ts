import { Schema, model } from "mongoose";
import { TBooked } from "./booked.interfase";

const bookedSchema = new Schema<TBooked>({
  date: { type: String },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  carId: { type: Schema.Types.ObjectId, ref: "Car" },
  startTime: { type: String },
  endTime: { type: String },
  totalCost: { type: Number },
  isBooked: {
    type: String,
    enum: ["unconfirmed", "confirmed"],
    default: "unconfirmed",
  },
});
export const Booked = model<TBooked>("Booked", bookedSchema);
