import { ServiceClasse } from "../services/classe.service.js";
import type {  Request, Response }  from "express";
import { ModelClass } from "../models/classe.model.js";



export class ControllerClass{

        static async createClasse(req: Request, res: Response){

        const serviceClasse = new ServiceClasse()

        const body = req.body

        console.log('body')

        const result = await serviceClasse.createClasse(body)

        if (result.success){
           return res.status(201).json({success: true, message: 'Nouvelle classe creer avec succes'})
        }

        return res.status(400).json({success: false, message: 'Echec de la creation e la classe'})
    }

    static async listClass(req: Request, res: Response ){
        const modelClasse = ModelClass
        try {
            const liste = await modelClasse.listClass()
            res.status(200).json({success: true, message: 'Liste des classes envoyee', list: liste})
        } catch (error) {
            console.log('Erreur dans liste classe', error)
            res.status(400).json({sucess: false, message: 'Erreur dans liste classe'})
            
        }
    }


    static async updateClasse(req: Request, res: Response){
        const serviceClasse = new ServiceClasse
        const body = req.body
        const niveau = req.params.niveau

        if(!niveau || Array.isArray(niveau)){
            return res.status(400).json({sucess: false, message: 'Donnees invalide'})
        }


        try {
            const result = await serviceClasse.update(body, niveau)
            console.log('ok updateclasse controller')
            return res.status(200).json({sucess: true, message: 'Classe modifier avec succes'})
            
        } catch (error) {
            console.log('probleme dans controllers classe: ', error)
        }
    }
}