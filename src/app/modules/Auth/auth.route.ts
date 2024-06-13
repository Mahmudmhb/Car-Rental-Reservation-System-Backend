import { Router } from "express";
import validationRequset from "../../middleware/validationRequest";
import { AuthControllers } from "./auth.controller";

const router = Router();
router.post("/signup", AuthControllers.registerUser);
router.post("/signin", AuthControllers.userLogin);
export const AuthRoute = router;
