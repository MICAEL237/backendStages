import { Router } from "express";
import { ControllerStudent } from "../controllers/student.controller.js";



const routerStudent = Router()

routerStudent.post('/', ControllerStudent.create)
routerStudent.get('/', ControllerStudent.read)
routerStudent.delete('/:matricule', ControllerStudent.delete)
routerStudent.post('/moy', ControllerStudent.NoteMoyenne)
routerStudent.get('/ListNote/:annee/:salle', ControllerStudent.ListeNoteMat)
routerStudent.get('/ListEl/:annee/:salle', ControllerStudent.ListeElClass)




export default routerStudent