import type { Request, Response } from "express";
import { UserService } from "../services/user.service.js";

export class UserController {
    static async create(req: Request, res: Response) {
        const body = req.body;

        console.log(body)
         console.log('ici')

        const userService = new UserService();

       
        const results = await userService.createUser(body)
        console.log('la')
        

        if (results.success){
            console.log('Bon')
            return res.status(results.status).json({ ok: true });

        }

        console.log('Mauvais')
        return res.status(results.status).json({ ok: false, message: results.message });
    }

    static async list(req: Request, res: Response) {
        return res.json({ ok: true });
    }
}