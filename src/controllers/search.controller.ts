import { Request, Response } from "express";
import SearchHandler from "../handlers/search.handler";

export const search = async (req: Request, res: Response) => {
  try {
    const keyword: string = (req.query.keyword as string) || "";
    const response = await SearchHandler.search(keyword);
    res.json(response);
  } catch (err) {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};
