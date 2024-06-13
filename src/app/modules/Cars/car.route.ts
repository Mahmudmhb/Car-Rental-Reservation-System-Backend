import { Router } from "express";
import validationRequset from "../../middleware/validationRequest";
import { CarController } from "./car.controller";
import { CarValidation } from "./car.validation";

const router = Router();
router.post(
  "/",
  validationRequset(CarValidation.createCarValidationSchema),
  CarController.createCar
);
router.get("/:id", CarController.getSingleCar);
router.put("/return", CarController.returnUpdateCar);
router.put("/:id", CarController.updateCar);
router.delete("/:id", CarController.deleteCar);
router.get("/", CarController.getAllCar);
export const CarRoute = router;
