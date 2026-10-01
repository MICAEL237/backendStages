import type { Request, Response } from 'express';
import { UserService } from '../services/user.service.js';
import { UserModel } from '../models/user.model.js';

import bcrypt from 'bcrypt'

export class UserController {
  static async create(req: Request, res: Response) {
    const body = req.body;
    const Haschpassword = await bcrypt.hash(body.passeword, 10)
    const bodyData = {
      name: body.name,
      email: body.email,
      specialite:body.specialite,
      tel: body.tel,
      passeword: Haschpassword,
      id_role: body.id_role
}
 console.log(bodyData)

    console.log(body);

    const userService = new UserService();

    const results = await userService.createUser(bodyData);

    if (!results.success) {
      console.log('Mauvais', results.message);
      return res
        .status(results.status)
        .json({ ok: false, message: results.message });
    }

    console.log('Bon');
    return res.status(results.status).json({ ok: true });
  }

  static async list(req: Request, res: Response) {
    return res.json({ ok: true });
  }

  static async ListUser(req: Request, res: Response) {
    const usermodel = new UserModel();
    const List = await usermodel.readUser();
    return res.status(200).json({ success: true, data: List });
  }
}
