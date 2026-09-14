import type { Request, Response } from "express";
import { AuthServices } from "../services/auth.services.js";



export class AuthController{
    static async Login(res: Response, req: Request){
        const body = req.body

        const authServices = new AuthServices()
        const token = authServices.Login(body)

        if(!token){
            return res.json({ success: false, status:401 ,messsage: 'echec'})
        }
        return res.status(200).json({success: true, message: 'Authentiication valider'})

        

    }
}