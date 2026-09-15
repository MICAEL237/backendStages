import  {type Request, type Response } from "express";
import { AuthServices } from "../services/auth.services.js";



export class AuthController{
    static async Login(req: Request, res: Response){
        const body = req.body
        console.log(body)

        const authServices = new AuthServices()
        const token = await authServices.Login(body)
        

        if(!token){
            return res.json({ success: false, status:401 ,messsage: 'echec'})
        }
        return res.status(200).json({success: true, message: 'Authentiication valider', token})

        

    }
}