import z from "zod"
import { ModelStudent } from "../models/students.model.js"
import type { StudentDIO } from "../type.js"
const model = z.object( {
    matricule: z.string(),
    nom: z.string(),
    prenom: z.string(),
    date_naiss: z.coerce.date(),
    lieu: z.string(),
    sexe: z.string()

})




export class ServiceStudent{
     

    async create(studentData: StudentDIO){
        const modelStudent = new ModelStudent

        const result = model.safeParse(studentData)

        if(result.success){
            modelStudent.create(studentData)
            console.log('Creation reussite')
            return result
        }

        
        return console.log('Entrer non valide serivce create student')


    }
}