import { Router } from "express";
import { userRoute } from "../modules/User/user.route";

const router = Router();
const modulesRoute = [
  {
    path: "/create-user",
    route: userRoute,
  },
];
modulesRoute.forEach((route) => router.use(route.path, route.route));
export default router;
