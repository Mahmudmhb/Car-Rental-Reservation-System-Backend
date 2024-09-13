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
  products?: string; // Added for car name or product details
  totalCost?: number;
  status?: "Pending" | "Confirmed" | "Cancelled"; // Added for order status
  paymentStatus?: "Pending" | "Paid"; // Added for payment status
  transactionId: string; // Added for transaction ID
  endTime?: string;
  isBooked?: "unconfirmed" | "confirmed";
  isDeleted?: boolean;
  payment: IBookingForm;
};
