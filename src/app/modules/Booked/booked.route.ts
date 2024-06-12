import { Router } from "express";
import validationRequset from "../../middleware/validationRequest";
import { bookedValidation } from "./booked.validation";
import { BookedController } from "./booked.controller";

const router = Router();
router.post(
  "/",
  validationRequset(bookedValidation.newBookedValidationSchema),
  BookedController.newBooked
);
router.get("/", BookedController.getAllOrders);
export const BookedRoute = router;
