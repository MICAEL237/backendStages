import  {type Request, type Response } from "express";
import { AuthServices } from "../services/auth.services.js";
import { success } from "zod";



export class AuthController{
    static async Login(req: Request, res: Response){
        const body = req.body
        console.log(body)

        const authServices = new AuthServices()
        const token = await authServices.Login(body)

        
        if(!token?.user){
            return res.status(404).json({success: false, message:'Identifiant non valident veuillez reessayer'})
        }

        if(!token?.Resulte.success){
            return res.status(400).json({ success: false, messsage: 'echec'})
        }

        
        return res.status(200).json({success: true, message: 'Authentiication valider', token: token?.token})

        

    }
}