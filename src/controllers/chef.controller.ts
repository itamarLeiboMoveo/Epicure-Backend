import { Request, Response } from "express";
import ChefHandler from "../handlers/chef.handler";

export const getAll = async (req: Request, res: Response) => {
  try {
    const chefs = await ChefHandler.getAll();
    res.json(chefs);
  } catch (err) {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const chefId = req.params.id;
    const chef = await ChefHandler.getById(chefId);
    if (!chef) {
      return res.status(404).json({ message: "Chef not found" });
    }
    res.json(chef);
  } catch (error) {
    res.status(500).json({ message: "An unexpected error occurred" + error });
  }
};

export const getChefOfTheWeek = async (req: Request, res: Response) => {
  try {
    console.log("getChefOfTheWeek controller start!");
    const chef = await ChefHandler.getChefOfTheWeek();
    res.json(chef);
  } catch (err) {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const newChef = await ChefHandler.create(req.body);
    res.status(201).json(newChef);
  } catch (error) {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const chefId = req.params.id;
    const updatedChefData = req.body.updatedChefData;
    const newRestaurant = req.body.newRestaurant || [];
    const deletedRestaurant = req.body.deletedRestaurant || [];
    const updatedChef = await ChefHandler.update(
      chefId,
      updatedChefData,
      newRestaurant,
      deletedRestaurant
    );

    if (!updatedChef) {
      return res.status(404).json({ message: "Chef not found" });
    }
    res.json(updatedChef);
  } catch (error) {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

export const deleteChef = async (req: Request, res: Response) => {
  try {
    const chefId = req.params.id;
    const deletedChef = await ChefHandler.delete(chefId);
    if (!deletedChef) {
      return res.status(404).json({ message: "Chef not found" });
    }
    res.json(deletedChef);
  } catch (error) {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};
