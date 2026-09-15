import { ModelClass } from "../models/classe.model.js";
import { z } from 'zod'
import type { classeDIO } from "../types.js";

const model = z.object({
    niveau: z.string(),
    cycle: z.string(),
    sous_section: z.string()

})



export class ServiceClasse{

    private modelClass = new ModelClass

    async createClasse(dataClasse: classeDIO){
        const result = model.safeParse(dataClasse)

        if (result.success){
            try {
                this.modelClass.createClasse(dataClasse)
                console.log('ok creation reussi dans services')
                
            } catch (error) {
                console.log('Erreur Creerclasse services: ', error)
                
            }
        }

    
        return result
    }

    async update(UpdateData: classeDIO, niveau: string ){
        const result = model.safeParse(UpdateData)

        if(result.success){
            try {
                this.modelClass.updateClasse(UpdateData, niveau)
                console.log('mise a jour de la classe terminee')
            } catch (error) {

                console.log('Erreur UpdateClasse service:', error)
                
            }

            return result

        }
    
}


}