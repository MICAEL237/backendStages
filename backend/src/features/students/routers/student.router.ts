import { Router } from "express";
import { ControllerStudent } from "../controllers/student.controller.js";



const routerStudent = Router()

routerStudent.post('/create', ControllerStudent.create)
routerStudent.get('/list', ControllerStudent.read)
routerStudent.get('/delete/:matricule', ControllerStudent.delete)



export default routerStudent