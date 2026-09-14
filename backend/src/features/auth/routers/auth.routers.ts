import { Router } from "express";
import { AuthController } from "../controllers/auth.controllers.js";


export const AuthRouter = Router()


AuthRouter.post("/", AuthController.Login)