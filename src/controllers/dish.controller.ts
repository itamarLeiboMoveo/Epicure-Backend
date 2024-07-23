import { Request, Response } from "express";
import DishHandler from "../handlers/dish.handler";

export const getAll = async (req: Request, res: Response) => {
  try {
    const dishes = await DishHandler.getAll();
    res.json(dishes);
  } catch (err) {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const dishId = req.params.id;
    const dish = await DishHandler.getById(dishId);
    if (!dish) {
      return res.status(404).json({ message: "Dish not found" });
    }
    res.json(dish);
  } catch (error) {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    console.log("dish controller");
    const newDish = await DishHandler.create(req.body);
    console.log(newDish);
    res.status(201).json(newDish);
  } catch (error) {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const dishId = req.params.id;
    const updatedDish = await DishHandler.update(
      dishId,
      req.body.updatedDishData
    );
    if (!updatedDish) {
      return res.status(404).json({ message: "Dish not found" });
    }
    res.json(updatedDish);
  } catch (error) {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

export const deleteDish = async (req: Request, res: Response) => {
  try {
    const dishId = req.params.id;
    const deletedDish = await DishHandler.delete(dishId);
    if (!deletedDish) {
      return res.status(404).json({ message: "Dish not found" });
    }
    res.json(deletedDish);
  } catch (error) {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};
