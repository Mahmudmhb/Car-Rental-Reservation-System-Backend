import { Router } from "express";
import validationRequset from "../../middleware/validationRequest";
import { CarController } from "./car.controller";
import { CarValidation } from "./car.validation";
import auth from "../../middleware/auth";
import { user_role } from "../User/user.constant";

const router = Router();
router.post(
  "/",
  auth(user_role.admin),
  validationRequset(CarValidation.createCarValidationSchema),
  CarController.createCar
);
router.get("/:id", CarController.getSingleCar);
router.put("/return", CarController.returnUpdateCar);
router.put(
  "/:id",
  auth(user_role.admin),
  validationRequset(CarValidation.updateCarValidationSchema),
  CarController.updateCar
);
router.delete("/:id", auth(user_role.admin), CarController.deleteCar);
router.get("/", CarController.getAllCar);
export const CarRoute = router;
