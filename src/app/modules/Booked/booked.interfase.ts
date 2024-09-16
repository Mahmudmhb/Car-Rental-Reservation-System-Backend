import mongoose, { Types } from "mongoose";

export type IBookingForm = {
  nidOrPassport: string;
  drivingLicense: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  startTime: string;
};

export type TBooked = {
  date?: string;
  user?: Types.ObjectId;
  carId: Types.ObjectId;
  products?: string;
  totalCost?: number;
  status?: "Pending" | "Confirmed" | "Cancelled";
  paymentStatus?: "Pending" | "Paid";
  transactionId?: string;
  endTime?: string;
  isBooked?: "unconfirmed" | "confirmed";
  isDeleted?: boolean;
  payment: IBookingForm;
};
