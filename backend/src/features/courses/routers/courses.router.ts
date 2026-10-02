import { Router } from "express";
import { ControllerCourses } from "../controllers/courses.controllers.js";



const coursesRouter = Router()


coursesRouter.post('/', ControllerCourses.create)
coursesRouter.get('/', ControllerCourses.read)
coursesRouter.put('/:intitule', ControllerCourses.update)
coursesRouter.delete('/:intitule', ControllerCourses.delete)
coursesRouter.get('/listes/:annee/:salle', ControllerCourses.UserClasse )


export default coursesRouter