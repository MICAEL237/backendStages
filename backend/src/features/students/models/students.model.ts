import * as model from '../../../db/schema.js'
import type { StudentDIO } from '../type.js';
import { db } from '../../../db/index.js'
import { eq } from 'drizzle-orm';


export class ModelStudent{

    async create(studentData: StudentDIO){
        try {

            return await db.insert(model.eleve).values(studentData)

        } catch (error) {
            
            console.log('Erreur model eleve: ', error)
            
        }
    }

    async list(){
        try {

            const liste = await db.select().from(model.eleve)
            return liste 

        } catch (error) {

            console.log("Erreur modelStudent liste: ", error)
            
        }
    }

    async delete(matricule: string){
        try {
            console.log('ok')
           return await db.delete(model.eleve).where(eq(model.eleve.matricule, matricule))


        } catch (error) {
            console.log('Erreur delete studentmodel: ', error)
            
        }

    }

}