import { Schema, model } from "mongoose";
import { TCar } from "./car.interfase";

const carSchema = new Schema<TCar>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    color: { type: String, required: true },
    isElectric: { type: Boolean, required: true },
    features: { type: [String], required: true },
    status: {
      type: String,
      enum: ["available", "unavailable"],
      default: "available",
    },
    pricePerHour: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
    AdditionalFeatures: { type: [String], required: true },
    carType: {
      type: String,
      enum: ["SUV", "Sedan", "Hatchback", "Convertible"],
      required: true,
    },
    image: { type: String },
  },
  {
    timestamps: true,
  }
);
carSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
carSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
export const Car = model<TCar>("Car", carSchema);
