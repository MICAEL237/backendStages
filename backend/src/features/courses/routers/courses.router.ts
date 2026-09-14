import { Router } from "express";
import { ControllerCourses } from "../controllers/courses.controllers.js";



const coursesRouter = Router()


coursesRouter.post('/create', ControllerCourses.create)
coursesRouter.get('/list', ControllerCourses.read)
coursesRouter.put('/update/:intitule', ControllerCourses.update)
coursesRouter.delete('/del/:intitule', ControllerCourses.delete)


export default coursesRouter