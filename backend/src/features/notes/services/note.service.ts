import type { noteDTO } from "../types.js";
import { ModelNote } from "../models/note.model.js";
import { schema } from "../schemas/schema.zod.js";





export class ServiceNote{

    async create(Data: noteDTO){

        const modelnote = new ModelNote()
        const res = schema.safeParse(Data)

        try {
            if(res.success){
               await modelnote.create(Data)
               return res
            }
        } catch (error) {
            console.log('probleme dans create note', error)
            
        }
    }
}