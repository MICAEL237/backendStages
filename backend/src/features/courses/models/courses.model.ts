import { db } from '../../../db/index.js'
import * as model from '../../../db/schema.js'
import { eq } from 'drizzle-orm'


export class ModelCourses{

    async create(intitule: string){
        try {
                await db.insert(model.matiere).values({
                intitule: intitule
            })
            console.log('Insertion matiere terminer')
        } catch (error){
            console.log('Erreur createMatiere model: ', error)
            
        }

    }


    async read(){
       try {
        const  liste =  await db.select().from(model.matiere)
        return liste
        
       } catch (error) {
        console.log('Erreur read matiere model: ', error)
        
       }
    }


    async update(intitule: string, data:string){
        await db.update(model.matiere)
                .set({intitule: data})
                .where(eq(model.matiere.intitule, intitule))

    }


    async delete(intitule: string){
        await db.delete(model.matiere).where(eq(model.matiere.intitule, intitule))
    }
}