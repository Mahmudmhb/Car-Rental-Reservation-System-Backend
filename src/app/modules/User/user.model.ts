import { Schema, model } from "mongoose";
import { TUser } from "./user.interfase";
import { user_role } from "./user.constant";
import bcryptjs from "bcryptjs";
import config from "../../config";

const UserSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true, enum: Object.keys(user_role) },
    password: { type: String, required: true, select: 0 },
    phone: { type: Number, required: true },
    address: { type: String, required: true },
  },
  { timestamps: true }
);

// hash password
UserSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcryptjs.hash(
    user.password,
    Number(config.bcrypt_salt_round)
  );
  next();
});
UserSchema.post("save", async function (doc, next) {
  doc.password = "";
  next();
});

// Create and export the User model
export const User = model<TUser>("User", UserSchema);
