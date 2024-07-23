import Dish, { IDish } from "../models/dish.model";
import Restaurant from "../models/restaurant.model";
import { EStatus } from "../models/status.enum";

const DishHandler = {
  async getAll(): Promise<IDish[]> {
    const dishes = await Dish.find().populate("restaurant");
    return dishes;
  },
  async getById(dishId: string): Promise<IDish | null> {
    const dish = await Dish.findById(dishId);
    return dish;
  },
  async create(dishData: IDish): Promise<IDish> {
    console.log("dish handler: ");
    const newDish = new Dish(dishData);
    console.log(newDish);
    const savedDish = await (await newDish.save()).populate("restaurant");
    //update restaurant schema with the new dish.
    await Restaurant.findByIdAndUpdate(
      savedDish.restaurant,
      { $push: { dishes: savedDish._id } },
      { new: true, useFindAndModify: false }
    );
    return savedDish;
  },
  async update(
    dishId: string,
    updatedDishData: Partial<IDish>
  ): Promise<IDish | null> {
    const currentDish = await Dish.findById(dishId);
    if (!currentDish) {
      return null;
    }

    if (
      updatedDishData.restaurant &&
      updatedDishData.restaurant !== currentDish.restaurant
    ) {
      console.log("enter to the if condition");
      await Restaurant.findByIdAndUpdate(
        currentDish.restaurant,
        { $pull: { dishes: dishId } },
        { new: true }
      );

      await Restaurant.findByIdAndUpdate(
        updatedDishData.restaurant,
        { $push: { dishes: currentDish._id } },
        { new: true }
      );
    }

    console.log("updatedDishData from the client " + updatedDishData);
    const updatedDish = await Dish.findByIdAndUpdate(dishId, updatedDishData, {
      new: true,
    }).populate("restaurant");

    console.log("update dish after save" + updatedDish);
    return updatedDish;
  },

  async delete(dishId: string): Promise<IDish | null> {
    const deletedDish = await Dish.findByIdAndUpdate(
      dishId,
      { status: EStatus.DELETED },
      { new: true }
    );
    if (deletedDish) {
      await Restaurant.findByIdAndUpdate(
        deletedDish.restaurant,
        { $pull: { dishes: deletedDish._id } },
        { useFindAndModify: false }
      );
    }
    return deletedDish;
  },
};

export default DishHandler;
