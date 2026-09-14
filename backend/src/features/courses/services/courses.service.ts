import { ModelCourses } from "../models/courses.model.js";
import {  z } from 'zod'

const data = z.object({
    intitule: z.string
})

export class ServicesCourses{

      

    async create(intitule: string){
       const  modelCourses = new ModelCourses()
       const   result   = data.safeParse(intitule)

       if(result.success){
        try {
           await modelCourses.create(intitule)
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

}