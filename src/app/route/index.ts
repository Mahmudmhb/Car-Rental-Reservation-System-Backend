import { Router } from "express";
import { userRoute } from "../modules/User/user.route";
import { CarRoute } from "../modules/Cars/car.route";

const router = Router();
const modulesRoute = [
  {
    path: "/create-user",
    route: userRoute,
  },
  {
    path: "/cars",
    route: CarRoute,
  },
];
modulesRoute.forEach((route) => router.use(route.path, route.route));
export default router;
