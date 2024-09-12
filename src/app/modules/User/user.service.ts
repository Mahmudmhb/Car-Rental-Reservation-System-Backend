import { TUser } from "./user.interfase";
import { User } from "./user.model";

const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};
const getAllUserFromDB = async () => {
  const result = await User.find();
  return result;
};
const getSingleUserFromDB = async (id: string) => {
  const result = await User.findById(id);
  return result;
};
const updateSingleUserIntoDB = async (id: string, payload: TUser) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const UserService = {
  createUserIntoDB,
  getSingleUserFromDB,
  updateSingleUserIntoDB,
  getAllUserFromDB,
};
