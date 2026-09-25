import { eq } from 'drizzle-orm';
import { db } from '../../db/index.js';
import * as model from '../../db/schema.js';
import type { salleDTO } from '../types.js';

export class SalleModel {
  async create(salleData: salleDTO) {
    // const id_classe =await  db.select({ id: model.classe.id }).from(model.classe).where(eq(model.classe.niveau, salleData.classe));
    // const id_serie = await  db.select({ id: model.serie.id }).from(model.serie).where(eq(model.serie.intitule, salleData.serie));
    try {
        await db.insert(model.salle).values(salleData)

    } catch (error) {
        console.log('creation salle echouer', error)
        
    }
  }


  async read(){
    try {
        const listeSalle = await db.select().from(model.salle)
        return listeSalle
    } catch (error) {
        console.log('erruer listesalle', error)
        
    }
  }

  async delete(nom: string){
    try {
         return await db.delete(model.salle).where(eq(model.salle.nom_salle, nom))
    } catch (error) {
        console.log('probleme suppressiionList', error)
    }

  }
}
