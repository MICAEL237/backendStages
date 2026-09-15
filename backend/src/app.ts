import "dotenv/config"
import express, { type Request, type Response} from "express"
import { userRouter } from "./features/users/routers/user.router.js"
import { AuthRouter } from "./features/auth/routers/auth.routers.js"
import ClassRouter from "./features/classes/routers/classe.router.js"
import coursesRouter from "./features/courses/routers/courses.router.js"
import routerStudent from "./features/students/routers/student.router.js"
import { MiddlewareUser } from "./features/users/middlewares/user.middleware.js"
import { AuthMiddleware } from "./features/auth/middlewares/auth.middleware.js"
export const app = express()

app.use(express.json())
app.use(express.urlencoded())

app.get("/health", (req: Request, res: Response) => {
    res.json({ ok: true })
})

app.use("/api/v1/users", userRouter)
app.use("/api/v1/auth", AuthRouter)
app.use('/api/v1/classe',AuthMiddleware.AuthVerrify,MiddlewareUser.IsAdamin, ClassRouter)
app.use("/api/v1/courses",AuthMiddleware.AuthVerrify,MiddlewareUser.IsAdamin, coursesRouter)
app.use("/api/v1/student",AuthMiddleware.AuthVerrify,MiddlewareUser.IsAdamin, routerStudent)


app.listen(4000, () => {
    console.log("Server up at: http://localhost:4000");
})