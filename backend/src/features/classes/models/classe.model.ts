import { Result } from 'postcss';
import { db } from '../../../db/index.js';
import * as model from '../../../db/schema.js'
import type { classeDIO } from '../types.js';
import { eq } from 'drizzle-orm'



export class ModelClass {

    async createClasse(classeData: classeDIO){
        try {
            await db.insert(model.classe).values(classeData)
            console.log('Nouvelle classe ajouter')

        } catch (error) {
            console.log('Erreur: ', error)
            
        }
        finally{
            console.log('Terminer')
        }
    }

    async updateClasse(UpdateData:classeDIO, niveau: string ){
        try {
            const result = await db.update(model.classe)
                            .set(UpdateData)
                            .where(eq(model.classe.niveau, niveau))
            console.log('Affichage reussi')
            return result

            
        } catch (error) {
            console.log('Erreur: ', error)
            
        }
         

    }


     static async listClass(){
        try {
            const liste = db.select().from(model.classe)
            return liste 
        } catch (error) {
            console.log('Erreur list classe', error)
            
        }
        
     }

}