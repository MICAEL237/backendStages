import {type Request,  type Response}  from "express";
import { ServiceStudent } from "../services/student.sevice.js";
import { ModelStudent } from "../models/students.model.js";


export class ControllerStudent{
   
    

    static async create(req: Request, res: Response){
         const serviceStudent = new ServiceStudent()

        const body = req.body

        const result = await serviceStudent.create(body)

        if(!result){
            return res.status(400).json({
                sucess: false,
                message:"Aucune donnee body studentcreate"
            })
        }

        return res.status(201).json({
            success: true,
            message:"Eleve creer avec succes"
        })

    }


    static async read(req:Request, res:Response){

        const  modelStudent = new ModelStudent()
        try {
          const  liste = await modelStudent.list()
          return res.status(200).json({
            sucess: true,
            message:"Liste des etudiants",
            list: liste
          })
        } catch (error) {

            return res.status(400).json({
                success:false,
                message:error
            })
            
        }
    }

    static async delete(req: Request, res: Response){
        const  modelStudent = new ModelStudent()
        const matricule = req.params.matricule

        if(!matricule || Array.isArray(matricule)){
            return res.status(400).json({
                success: false,
                message:"Donnees invalide"
            })
        }
        try {
            console.log('ok')
            await modelStudent.delete(matricule)
            return res.status(200).json({
                success: true,
                message:"cet eleve a ete supprimer avec succes",
            })
        } catch (error) {
            console.log('probleme deleteStudent controller: ', error)
        }

    }
}