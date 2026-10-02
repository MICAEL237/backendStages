import { db } from '../../../db/index.js';
import * as  schema from '../../../db/schema.js'
import {and, eq} from 'drizzle-orm'
import type { CreateUserDTO } from '../type.js';

export class UserModel {
    async createUser(userData: CreateUserDTO) {
         await db.insert(schema.users).values(userData);
    }

    async selectEmail(){
         const usersEmails = await db.select({email: schema.users.email}).from(schema.users) ;
        return usersEmails
    }

    async fineUser(email: string){
            const User = await db.select().from(schema.users).where(eq(schema.users.email, email) )
            return User

    }

    async findUserINFO(email: string){
    
        const userID = await db.select({passeword: schema.users.passeword, email: schema.users.email}).from(schema.users).where(eq(schema.users.email, email) )
        return userID
    }

    async readUser(){
        const List = await db.select().from(schema.users)
        return List
    }


    async DashboardUser(email: string){
        const infos = await db.select({
            nom: schema.users.name,
            matiere: schema.matiere.intitule,
            salle: schema.salle.nom_salle,
            annee: schema.usersalle.annee
        }).from(schema.users)
         .innerJoin(schema.matiere, eq(schema.usermatiere.id_matiere, schema.matiere.id))
         .innerJoin(schema.salle, eq(schema.salle.id, schema.usersalle.id_salle))
         .innerJoin(schema.usersalle, eq(schema.users.id, schema.usersalle.id_ur))
         .where(and (eq(schema.users.email, email)))

         return infos
    }

}