import mongoose, { Schema, model } from "mongoose";
import { IBookingForm, TBooked } from "./booked.interfase";

const bookingFormSchema = new Schema<IBookingForm>({
  nidOrPassport: { type: String, required: true },
  drivingLicense: { type: String, required: true },
  cardNumber: { type: String, required: true },
  expirationDate: { type: String, required: true },
  cvv: { type: String, required: true },
  startTime: { type: String, required: true },
});

const bookedSchema = new Schema<TBooked>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    carId: { type: Schema.Types.ObjectId, ref: "Car" },
    products: { type: String }, // Name of the car (or products)
    totalCost: { type: Number, default: 0 },
    status: { type: String, default: "Pending" }, // Order status
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending",
    }, // Payment status
    transactionId: { type: String, required: true }, // Unique transaction ID
    endTime: { type: String, default: null },
    isBooked: {
      type: String,
      enum: ["unconfirmed", "confirmed"],
      default: "unconfirmed",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    payment: { type: bookingFormSchema },
  },
  {
    timestamps: true,
  }
);

export const Booked = model<TBooked>("Booked", bookedSchema);
