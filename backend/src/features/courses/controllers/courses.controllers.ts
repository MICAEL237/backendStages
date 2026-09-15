
import type { Request, Response } from "express";
import { ServicesCourses } from "../services/courses.service.js";
import { ModelCourses } from "../models/courses.model.js";


export class ControllerCourses{

    static async create(req: Request, res: Response){
        const serviceCourses = new ServicesCourses()
        const intitule = req.body 
       // const intitule = req.params.intitule

        const result = await serviceCourses.create(intitule)
       

        if(!result){
            
            return res.status(400).json({success: false, message:'Une erreur s\'est produite lors de la cretation de la matiere'})
        }

        return res.status(200).json({success: true, messge:'ok creation de la matiere reussite'})

    }


     static async update(req: Request, res: Response){
        const serviceCourses = new ServicesCourses()
        const intitule = req.params.intitule
        const data = req.body 
       // const intitule = req.params.intitule

        

        if(!intitule || Array.isArray(intitule)){
            return res.status(400).json({success: false, message:'Une erreur s\'est produite lors de la modification de la matiere'})
        }

        try {
            const result =  await serviceCourses.update(intitule, data)
            return res.status(200).json({success: true, messge:'ok Update de la matiere reussite'})

        } catch (error) {
            console.log("probleme de modification matiere")
            
        }

        return 0


    }


    static async read(req:Request, res: Response){
        const modelCourses = new ModelCourses()
        try {
            const liste = await modelCourses.read()
            console.log('ok read courses')
            return res.status(200).json({sucess: true, message: "Liste des Matieres...", liste: liste})
            
        } catch (error) {
            console.log("prbleme dans read classee controller: ", error)
            return res.status(404).json({success: false, message:"probleme est survenu"})
            
        }
    }


    static async delete(req: Request, res: Response){
        const modelCourses = new ModelCourses()
        const intutile = req.params.intitule
        try {
            if(!intutile || Array.isArray(intutile)){
                return res.status(400).json({success: false, message:"Entree invalide deleteCouses"})
            }

            modelCourses.delete(intutile)
            return res.status(200).json({success: true, message:"Suppresion effectuer avec succes"})
            
        } catch (error) {
            console.log('erreur de suppenssion matiere')
            
        }

    }
}