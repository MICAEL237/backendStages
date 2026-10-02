import type { Request, Response } from "express";
import { ServiceNote } from "../services/note.service.js";




export class NoteController{

    static async create(res: Response, req: Request){
        const servicenote = new ServiceNote()
        const body = req.body

        const result = await servicenote.create(body)

        if(!result?.success){
            return res.status(400).json({success: false, message:' donnee invalide'})
        }


        return res.status(200).json({success: true, message:' creattion reussite'})


    }
}