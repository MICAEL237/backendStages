import { db } from "../../../db/index.js";
import { note } from "../../../db/schema.js";
import type { noteDTO } from "../types.ts";





export class ModelNote {


    async create (Data: noteDTO){
        try {
            await db.insert(note).values(Data)
            return 0
        } catch (error) {
            console.log(error, "creation de note")
            
        }

    }
}