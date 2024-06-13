import { Model } from "mongoose";
import { user_role } from "./user.constant";
export type Tuser_role = keyof typeof user_role;
export interface TUser {
  name: string;
  email: string;
  role: keyof typeof user_role;
  password: string;
  phone: number;
  address: string;
}
export interface UserModel extends Model<TUser> {
  isUserExistsByCustomId(email: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    heshTextPassword: string
  ): Promise<boolean>;
}
