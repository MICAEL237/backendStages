import type { Request, Response } from "express"
import { ServiceSalle } from "../services/sallle.service.js"
import { SalleModel } from "../models/salle.model.js"
import { string, success } from "zod"



export class salleController{
    
    
    static async create(req: Request, res: Response ){
        const body = req.body 
        const  serviceSalle= new ServiceSalle()
        const ress = await serviceSalle.create(body)
        if(!ress?.success){
            return res.status(400).json({success: false, message:'Donnee non valide'})
        }

        return res.status(200).json({success:true})
    }


    static async delete(req: Request, res: Response){
        const salle = req.params.nom_salle
        const modelsalle = new SalleModel()
        try {
            if(!salle || Array.isArray(salle)){
                return res.status(400).json({success:false, message:'aucune donnnee fournie'})
            }
           return await modelsalle.delete(salle)
        } catch (error) {
            console.log('erreur contolleur sallesup', error)
            
        }
    }


    static async read(req: Request, res: Response){
        const modelsalle = new SalleModel()
        try {
           const result =  await modelsalle.read()
           return res.status(200).json({result})
        } catch (error) {
            console.log('probleme salleListe controller', error)
            
        }


    }
}