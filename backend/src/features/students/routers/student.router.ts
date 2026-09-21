import { Router } from "express";
import { ControllerStudent } from "../controllers/student.controller.js";



const routerStudent = Router()

routerStudent.post('/create', ControllerStudent.create)
routerStudent.get('/list', ControllerStudent.read)
routerStudent.get('/delete/:matricule', ControllerStudent.delete)
routerStudent.post('/moy', ControllerStudent.NoteMoyenne)
routerStudent.post('/ListNote', ControllerStudent.ListeNoteMat)
routerStudent.post('/ListEl', ControllerStudent.ListeElClass)




export default routerStudent