import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.post("/", UserController.create);
userRouter.get("/", UserController.ListUser);

export { userRouter };