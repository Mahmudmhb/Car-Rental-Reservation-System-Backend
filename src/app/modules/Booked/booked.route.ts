import { Router } from "express";
import validationRequset from "../../middleware/validationRequest";
import { bookedValidation } from "./booked.validation";
import { BookedController } from "./booked.controller";
import { user_role } from "../User/user.constant";
import auth from "../../middleware/auth";

const router = Router();
router.post(
  "/",
  auth(user_role.user),
  validationRequset(bookedValidation.newBookedValidationSchema),
  BookedController.newBooked
);
router.get("/", auth(user_role.admin), BookedController.getAllOrders);

router.get(
  "/my-bookings",
  auth(user_role.user),
  BookedController.getMyAllOrders
);
router.patch(
  "/:bookedId",
  auth(user_role.admin),
  BookedController.updateBooked
);
router.delete(
  "/:bookedId",

  BookedController.deleteBooked
);
router.post("/payment", BookedController.paymentCustomer);
export const BookedRoute = router;
