import "dotenv/config";
import express, { type Request, type Response} from "express";
import { userRouter } from "./features/users/routers/user.router.js";
import { AuthRouter } from "./features/auth/routers/auth.routers.js"
import ClassRouter from "./features/classes/routers/classe.router.js";
import coursesRouter from "./features/courses/routers/courses.router.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.get("/health", (req: Request, res: Response) => {
    res.json({ ok: true });
})

app.use("/api/v1/users", userRouter);
app.use("/api/v2/auth", AuthRouter)
app.use('/api/v3/classe', ClassRouter)
app.use("/api/v4/courses", coursesRouter)


app.listen(4000, () => {
    console.log("Server up at: http://localhost:4000");
})