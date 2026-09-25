import type { Request, Response } from 'express';
import { UserService } from '../services/user.service.js';
import { UserModel } from '../models/user.model.js';

export class UserController {
  static async create(req: Request, res: Response) {
    const body = req.body;

    console.log(body);

    const userService = new UserService();

    const results = await userService.createUser(body);

    if (!results.success) {
      console.log('Mauvais');
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
