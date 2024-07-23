import { Request, Response } from "express";
import UserHandler from "../handlers/user.handler";

const UserController = {
  create: async (req: Request, res: Response) => {
    try {
      const newUser = await UserHandler.create(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  },
  login: async (req: Request, res: Response) => {
    try {
      const token = await UserHandler.login(req.body.email, req.body.password);
      if (!token) {
        res.status(401).json({ error: "Invalid email or password" });
      }

      res.status(201).json(token);
    } catch (error) {
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  },
};
export default UserController;
