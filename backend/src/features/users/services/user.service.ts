import { UserModel } from "../models/user.model.js";
import type { CreateUserDTO } from "../type.js";
import * as z from "zod";

const schema = z.object({
    name: z.string(),
    email: z.email(),
    specialite: z.string(),
    tel: z.string(),
    password: z.string().min(4).max(15),
    id_role: z.coerce.number()
})


export class UserService{
    private userModel = new UserModel();

    async createUser(userData: CreateUserDTO) {
        
        const result = schema.safeParse(userData);
        const emailUsers = await this.userModel.selectEmail()

       if (result.success) {
            try {

                for (const email of emailUsers ){
                     if(email.email == userData.email){
                       return { success: false, status: 400, message: "cet identifiant existe deja veuillez reessayez" };
                     }
                }

                
                await this.userModel.createUser(userData);
    
                return { success: true, status: 201 };
            } catch (error) {
                console.error(error);

                return { success: false, status: 500, message: "Une erreur est survenue lors de la verrification" };
            }
        }



        

        return { success: false, status: 400,  message: result.error.message };
    }
}