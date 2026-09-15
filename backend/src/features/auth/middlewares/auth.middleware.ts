import { app } from "../../../app.js"
import type   {Request,  Response,  NextFunction} from "express"
import jwt from "jsonwebtoken"



export class AuthMiddleware{
    
    static AuthVerrify(req: Request, res: Response, next: NextFunction){

    const EnteteAuth = req.headers['authorization']
    const token = EnteteAuth && EnteteAuth.split('')[1]
    const  secret_jwt = (process.env.JWT_SECRET!) 


    if(!token){
        return res.status(401).json({sucess:false, Message:"Accès refusé. Aucun jeton fourni."})
    }


    try {
        
        const decoded = jwt.verify(token, secret_jwt); 
       ( req as any).user = decoded
       next()

    } catch (error) {
        return res.status(403).json({sucess:false, Message:"Jeton invalide ou expiré."})
    }



}



}





