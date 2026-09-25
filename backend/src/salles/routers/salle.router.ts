import { Router } from "express";
import { salleController } from "../controllers/salle.controller.js";


const salleRouter = Router()

salleRouter.post('/', salleController.create)
salleRouter.get('/', salleController.read)
salleRouter.delete('/', salleController.delete)

export default salleRouter