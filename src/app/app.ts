import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./route";
import gobalErrorHandler from "./middleware/gobalErrorHandler";
import NotFound from "./middleware/notFound";

const app: Application = express();
const port = 3000;
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// app.use();
app.use(gobalErrorHandler);
app.use(NotFound);
export default app;
