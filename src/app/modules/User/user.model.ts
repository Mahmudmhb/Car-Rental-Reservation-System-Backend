import { Schema, model } from "mongoose";
import { TUser } from "./user.interfase";

const UserSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true, enum: ["user", "admin"] },
    password: { type: String, required: true },
    phone: { type: Number, required: true },
    address: { type: String, required: true },
  },
  { timestamps: true }
);

// Create and export the User model
export const User = model<TUser>("User", UserSchema);
