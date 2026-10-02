import { ModelCourses } from "../models/courses.model.js";
import {  z } from 'zod'
import type { coursesDIO, NDTO } from "../type.js";

const data = z.object({
    intitule: z.string(),
    groupe: z.enum(['Groupe 1', 'Groupe 2', 'Groupe 3'])
})


const dataNDTO = z.object({
    annee: z.coerce.number(), 
    salle: z.string()
})
export class ServicesCourses{

      
    private modelCourses = new ModelCourses()
    async create(intitule: coursesDIO){
       
       const  result   = data.safeParse(intitule)
       console.log(result)

       if(result.success){
        try {
            this.modelCourses.create(intitule)
           console.log('ok createMatiere')
        } catch (error) {
            console.log('Erreur creationMatiere service')
            
        }
       }

       return result
    }


   async update(intitule: string, datas: string){
       const  modelCourses = new ModelCourses()
       const   result   = data.safeParse(datas)

       if(result.success){
        try {
           await modelCourses.update(intitule, datas)
           console.log('ok updateMatiere')
        } catch (error) {
            console.log('Erreur updateMatiere service')
            
        }
       }

       return result
    }

    async UserClasse(data: NDTO){
        const modelCourses = new ModelCourses()
        const verify = dataNDTO.safeParse(data)

        if(verify.success){
            try {
                const datas = await  modelCourses.UserClasse(data)
                return {datas, verify}
            } catch (error) {
                console.log('Echec liste user service', error)
                
            }
        }

    }

}