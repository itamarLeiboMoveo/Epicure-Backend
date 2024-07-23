import Restaurant, { IRestaurant } from "../models/restaurant.model";
import Chef from "../models/chef.model";
import { EStatus } from "../models/status.enum";

const RestaurantHandler = {
  async getAll(limit: number, skip: number): Promise<IRestaurant[]> {
    const restaurants = await Restaurant.find()
      .populate("chef")
      .populate("dishes")
      .populate("signatureDish")
      .skip(skip)
      .limit(limit);
    // const restaurants = await Restaurant.aggregate([
    //   { $skip: skip },
    //   { $limit: limit },
    //   {
    //     $lookup: {
    //       from: "chefs",
    //       localField: "chef",
    //       foreignField: "_id",
    //       as: "chef",
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: "dishes",
    //       localField: "dishes",
    //       foreignField: "_id",
    //       as: "dishes",
    //     },
    //   },
    // ]);

    return restaurants;
  },

  async getById(restaurantId: string): Promise<IRestaurant | null> {
    const restaurant = await Restaurant.findById(restaurantId);
    return restaurant;
  },

  async getAllWithoutPagination(): Promise<IRestaurant[]> {
    const restaurants = await Restaurant.find()
      .populate("chef")
      .populate("dishes")
      .populate("signatureDish");

    return restaurants;
  },

  async create(restaurantData: IRestaurant): Promise<IRestaurant> {
    const { signatureDish, ...restOfData } = restaurantData;
    const newRestaurant = new Restaurant({
      ...restOfData,
      signatureDish: signatureDish || null,
    });
    console.log(newRestaurant);
    const savedRestaurant = await (await newRestaurant.save()).populate("chef");
    console.log(savedRestaurant);
    await Chef.findByIdAndUpdate(
      savedRestaurant.chef,
      { $push: { restaurants: savedRestaurant._id } },
      { new: true, useFindAndModify: false }
    );
    console.log(savedRestaurant);
    return savedRestaurant;
  },

  async update(
    restaurantId: string,
    updatedRestaurantData: Partial<IRestaurant>
  ): Promise<IRestaurant | null> {
    const currentRestaurant = await Restaurant.findById(restaurantId);

    if (
      currentRestaurant?.chef &&
      currentRestaurant.chef !== updatedRestaurantData.chef
    ) {
      await Chef.findByIdAndUpdate(currentRestaurant.chef, {
        $pull: { restaurants: currentRestaurant._id },
      });
      await Chef.findByIdAndUpdate(updatedRestaurantData.chef, {
        $addToSet: { restaurants: currentRestaurant._id },
      });
    }
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      updatedRestaurantData,
      { new: true }
    )
      .populate("chef")
      .populate("dishes")
      .populate("signatureDish");
    return updatedRestaurant;
  },

  async delete(restaurantId: string): Promise<IRestaurant | null> {
    const deletedRestaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      { status: EStatus.DELETED },
      { new: true }
    )
      .populate("chef")
      .populate("dishes")
      .populate("signatureDish");
    if (deletedRestaurant) {
      await Chef.findByIdAndUpdate(
        deletedRestaurant.chef,
        { $pull: { restaurants: deletedRestaurant._id } },
        { new: true }
      );
    }
    return deletedRestaurant;
  },
};

export default RestaurantHandler;
