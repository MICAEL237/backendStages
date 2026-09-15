import { db } from '../../../db/index.js';
import * as  schema from '../../../db/schema.js'
import {eq} from 'drizzle-orm'
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



}