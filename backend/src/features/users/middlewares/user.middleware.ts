import type {Response, Request, NextFunction } from "express";



export class MiddlewareUser{
    static IsAdamin(req:Request, res: Response, next: NextFunction ){
        const userRole = (req as any).user 

        if(userRole.id_role === 1){
            next()
        }else{
            return res.status(403).json({sucess:false, message:"Espace reserver aux admins"})
        }

    }
}