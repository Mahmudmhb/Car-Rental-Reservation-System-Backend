import { Router } from "express";
import validationRequset from "../../middleware/validationRequest";
import { AuthControllers } from "./auth.controller";
import { UserValidation } from "../User/user.validation";

const router = Router();
router.post(
  "/signup",
  validationRequset(UserValidation.createUserValidationSchema),
  AuthControllers.registerUser
);
router.post("/signin", AuthControllers.userLogin);
router.patch(
  "/:userId",
  validationRequset(UserValidation.updateUserValidationSchema),
  AuthControllers.updateUser
);
export const AuthRoute = router;
