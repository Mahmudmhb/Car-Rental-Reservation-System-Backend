import { Router } from "express";
import { UserController } from "./user.controller";
import validationRequset from "../../middleware/validationRequest";
import { UserValidation } from "./user.validation";
import auth from "../../middleware/auth";
import { user_role } from "./user.constant";

const router = Router();
router.get("/", auth(user_role.admin), UserController.getAllUser);
router.get("/:userId", auth(user_role.admin), UserController.getSingleUser);
router.patch(
  "/:userId",
  auth(user_role.admin),
  UserController.updateSingleUser
);
// router.post(
//   "/signup",
//   validationRequset(UserValidation.createUserValidationSchema),
//   UserController.createUser
// );
export const userRoute = router;
