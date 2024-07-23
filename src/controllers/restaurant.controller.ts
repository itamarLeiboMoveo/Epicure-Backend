import { Request, Response } from "express";
import RestaurantHandler from "../handlers/restaurant.handler";

export const getAll = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.nextPage as string);
    const limit = parseInt(req.query.limit as string);
    const skip = (page - 1) * limit;

    const restaurants = await RestaurantHandler.getAll(limit, skip);
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const restaurantId = req.params.id;
    const restaurant = await RestaurantHandler.getById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

export const getAllWithoutPagination = async (req: Request, res: Response) => {
  try {
    const restaurants = await RestaurantHandler.getAllWithoutPagination();
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const newRestaurant = await RestaurantHandler.create(req.body);
    res.status(201).json(newRestaurant);
  } catch (error) {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const restaurantId = req.params.id;
    const updatedRestaurant = await RestaurantHandler.update(
      restaurantId,
      req.body
    );
    if (!updatedRestaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.json(updatedRestaurant);
  } catch (error) {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};

export const deleteRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurantId = req.params.id;
    const deletedRestaurant = await RestaurantHandler.delete(restaurantId);
    if (!deletedRestaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.json(deletedRestaurant);
  } catch (error) {
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};
