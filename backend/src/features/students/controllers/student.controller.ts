import {type Request,  type Response}  from "express";
import { ServiceStudent } from "../services/student.sevice.js";
import { ModelStudent } from "../models/students.model.js";
import type { StudentNDTO, StudentSDTO } from "../type.js";


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
        console.log(matricule)

        if(!matricule || Array.isArray(matricule)){
            return res.status(400).json({
                success: false,
                message:"Donnees invalide"
            })
        }
        try {
            console.log('ok...')
            await modelStudent.delete(matricule)
            return res.status(200).json({
                success: true,
                message:"cet eleve a ete supprimer avec succes",
            })
        } catch (error) {
            console.log('probleme deleteStudent controller: ', error)
        }

    }


    static async NoteMoyenne(req: Request<StudentSDTO>, res: Response ){
        const {annee, salle} = req.params
         const serviceStudent = new ServiceStudent()
         
         

         try {
            const NoteCoefEl = await serviceStudent.sommeCoef({annee, salle})
            const NoteMoyenne = await serviceStudent.MoyApreciation({annee, salle})
             

            

            if(!NoteCoefEl?.objet || !NoteMoyenne){
                return res.status(404).json({sucess: false, message:"aucune donnees recuperer service studentMoy"})
            }

            if(!NoteCoefEl?.res){
                return res.status(400).json({sucess: false, message:"Veuillez entrer des donnees valides..."})
            }



            return res.status(200).json({ NoteMoyenne})
         } catch (error) {
            return res.status(500).json({sucess: false, message:"probleme survenu lorsde l'execution studentMoy "})

         }
    }


      static async ListeNoteMat(req: Request<StudentNDTO>, res: Response ){
         const serviceStudent = new ServiceStudent()
         const params = req.params
         console.log(params)

        

         try {
            const NoteCoefMat = await serviceStudent.ListeNoteMat(params)

            if(NoteCoefMat?.FinalObjet[0]?.length == 0){
                return res.status(404).json({sucess: false, message:"aucune donnees recuperer service studentMoy"})
            }

            if(!NoteCoefMat?.res.success){
                return res.status(400).json({sucess: false, message:"Mauvaise donnees entree service studentMoy", data: NoteCoefMat?.res.data})

            }

            return res.status(200).json({success: true, message:"recuperer avec succes Liste des Note par matiere", data: NoteCoefMat?.FinalObjet})
         } catch (error) {
            return res.status(500).json({sucess: false, message:"probleme survenu lorsde l'execution: ", error})

         }
    }



     static async ListeElClass(req: Request<StudentNDTO>, res: Response ){
         const serviceStudent = new ServiceStudent()
         const params = req.params

        

         try {
            const NoteCoefMat = await serviceStudent.ListeElClass(params)

            if(!NoteCoefMat?.FinalObjet){
                return res.status(404).json({sucess: false, message:"aucune donnees recuperer service "})
            }

            if(!NoteCoefMat.result){
                return res.status(400).json({sucess: false, message:"Mauvaise donnees entree service "})

            }
            console.log( )

            return res.status(200).json({success: true,data: NoteCoefMat?.FinalObjet})
         } catch (error) {
            return res.status(500).json({sucess: false, message:"probleme survenu lorsde l'execution: ", error})

         }
    }
}