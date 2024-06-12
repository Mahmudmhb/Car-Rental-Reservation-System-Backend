import { Schema, model } from "mongoose";
import { TCar } from "./car.interfase";

const carSchema = new Schema<TCar>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    color: { type: String, required: true },
    isElectric: { type: Boolean, required: true },

    features: { type: [String], required: true },
    pricePerHour: { type: Number },
    status: {
      type: String,
      required: true,
      enum: ["available", "unavailable"],
      default: "available",
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
export const Car = model<TCar>("Car", carSchema);
