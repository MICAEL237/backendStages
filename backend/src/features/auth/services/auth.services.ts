import z from 'zod';
import { UserModel } from '../../users/models/user.model.js';
import type { AuthTD } from '../typeAuth.js';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const model = z.object({
  email: z.email(),
  passeword: z.string().min(4).max(255),
});

export class AuthServices {
  model = new UserModel();

  async Login(AuthData: AuthTD) {
    // console.log(AuthData)
    const Resulte = model.safeParse(AuthData);
    console.log(Resulte);
    if (Resulte.success) {
      const UserINFO = await this.model.findUserINFO(AuthData.email);
      // console.log(UserINFO)
      const truePassword = await bcrypt.compare(AuthData.passeword, UserINFO[0]?.passeword! )
      const TrueEmail =  AuthData.email === UserINFO[0]?.email
      const user = truePassword && TrueEmail
      
      console.log(user)
      if (user) {
       

        const secret_jwt = process.env.JWT_SECRET!;

        const User = await this.model.fineUser(AuthData.email);

        const payload = {
          id: User[0]?.id,
          name: User[0]?.name,
          role: User[0]?.id_role,
        };
        // console.log(payload)

        const token = jwt.sign(payload, secret_jwt, { expiresIn: '4h' });
        console.log(token)
        return { token, Resulte, user };
      }
    }

    // const decoded = jwt.verify(token, secret_jwt)
  }
}
