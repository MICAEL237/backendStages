import { Router } from "express";
import { ControllerClass } from "../controllers/classe.controler.js";



const ClassRouter = Router()


ClassRouter.post('/create',  ControllerClass.createClasse)
ClassRouter.get('/list',ControllerClass.listClass)
ClassRouter.get('/update/:niveau',ControllerClass.updateClasse)



export default ClassRouter

