import z from "zod";
import type { salleDTO } from "../types.js";
import { SalleModel } from "../models/salle.model.js";


const model = z.object({
    salle_name: z.string().min(1).max(255),
    effectif: z.number(),
    id_classe: z.number(),
    id_serie: z.number()
}) 



export class ServiceSalle{
    private modelsalle = new SalleModel
    async create(salleData: salleDTO){
        const res = model.safeParse(salleData)
        
        if(res.success){
             await this.modelsalle.create(salleData)
             return res
        }

        console.log('donnees invalide createsalle')
        
    }
}