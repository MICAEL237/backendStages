import { db } from '../../../db/index.js'
import * as model from '../../../db/schema.js'
import { and, eq } from 'drizzle-orm'
import type { coursesDIO, NDTO } from '../type.js'


export class ModelCourses{

    async create(intitule: coursesDIO){
        try {
                await db.insert(model.matiere).values(intitule)
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

    async UserClasse(data: NDTO){
       
        const userSalle = await db.select({
            
            salle: model.salle.nom_salle,
            name: model.users.name,
            nom: model.matiere.intitule,
        }).from(model.usersalle)
          .innerJoin(model.users, eq(model.usersalle.id_ur, model.users.id))
          .innerJoin(model.usermatiere, eq(model.usermatiere.id_ur, model.users.id))
          .innerJoin(model.matiere, eq(model.matiere.id, model.usermatiere.id_matiere))
          .innerJoin(model.salle, eq(model.usersalle.id_salle, model.salle.id))
          .where(and(eq(model.salle.nom_salle, data.salle), eq(model.usersalle.annee, data.annee)))
}

}