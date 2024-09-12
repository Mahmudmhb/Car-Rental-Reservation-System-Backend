import { Router } from "express";
import validationRequset from "../../middleware/validationRequest";
import { CarController } from "./car.controller";
import { CarValidation } from "./car.validation";
import auth from "../../middleware/auth";
import { user_role } from "../User/user.constant";
import { BookedController } from "../Booked/booked.controller";
import { bookedValidation } from "../Booked/booked.validation";

const router = Router();
router.post(
  "/",
  auth(user_role.admin),
  validationRequset(CarValidation.createCarValidationSchema),
  CarController.createCar
);
router.get("/:id", CarController.getSingleCar);
router.put(
  "/return",
  auth(user_role.admin),
  validationRequset(bookedValidation.updateBookedValidationSchema),
  BookedController.returnBooked
);
router.patch("/:id", auth(user_role.admin), CarController.updateCar);
router.delete("/:carId", auth(user_role.admin), CarController.deleteCar);

router.get("/", CarController.getAllCar);
export const CarRoute = router;
