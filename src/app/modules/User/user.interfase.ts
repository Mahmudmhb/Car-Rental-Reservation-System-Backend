import { user_role } from "./user.constant";

export type TUser = {
  name: string;
  email: string;
  role: keyof typeof user_role;
  password: string;
  phone: number;
  address: string;
};
