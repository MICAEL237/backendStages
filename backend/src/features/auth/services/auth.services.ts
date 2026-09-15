import { UserModel } from "../../users/models/user.model.js";
import type {AuthTD}  from "../typeAuth.js";
import 'dotenv/config'
import jwt from 'jsonwebtoken'



export class AuthServices{
    model = new UserModel()

    async Login(AuthData: AuthTD){
      console.log(AuthData)
       const UserINFO = await this.model.findUserINFO(AuthData.email)
       const user =(AuthData.email === UserINFO[0]?.email && AuthData.password === UserINFO[0]?.passeword)

       if (!user){
         return {success: false, status:401, message: "Identifiant(email et mot de passe ) nom valide veuillez reessayer"}
       }

        const  secret_jwt = (process.env.JWT_SECRET!) 

       const User = await this.model.fineUser(AuthData.email) 

       const payload = {
        id: User[0]?.id,
        name: User[0]?.name,
        role: User[0]?.id_role
        }

        const token = jwt.sign(payload, secret_jwt, {expiresIn: "4h"} )

        const decoded = jwt.verify(token, secret_jwt) 
        
        return token

    }
}