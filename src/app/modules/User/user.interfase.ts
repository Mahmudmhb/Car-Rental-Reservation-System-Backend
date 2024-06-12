export type TUser = {
  name: string;
  email: string;
  role: "user" | "admin";
  password: string;
  phone: number;
  address: string;
};
