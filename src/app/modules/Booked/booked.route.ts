import { Router } from "express";
import validationRequset from "../../middleware/validationRequest";
import { bookedValidation } from "./booked.validation";
import { BookedController } from "./booked.controller";
import auth from "../../middleware/auth";
import { user_role } from "../User/user.constant";

const router = Router();
router.post(
  "/",
  validationRequset(bookedValidation.newBookedValidationSchema),
  BookedController.newBooked
);
router.get("/", auth(user_role.user), BookedController.getAllOrders);
export const BookedRoute = router;
