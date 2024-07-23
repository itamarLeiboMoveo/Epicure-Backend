import Chef, { IChef } from "../models/chef.model";
import { IRestaurant } from "../models/restaurant.model";
import { EStatus } from "../models/status.enum";

const ChefHandler = {
  async getAll(): Promise<IChef[]> {
    const chefs = await Chef.find().populate("restaurants");
    console.log(chefs);
    return chefs;
  },
  async getById(chefId: string): Promise<IChef | null> {
    const chef = await Chef.findById(chefId);
    return chef;
  },
  async getChefOfTheWeek(): Promise<IChef | null> {
    console.log("hila");
    const chefOfTheWeek = await Chef.findOne({
      isChefOfTheWeek: true,
    }).populate("restaurants");
    console.log(chefOfTheWeek);
    return chefOfTheWeek;
  },
  async create(chefData: IChef): Promise<IChef> {
    const newChef = new Chef(chefData);
    const savedChef = await newChef.save();
    console.log(savedChef);
    return savedChef;
  },
  async update(
    chefId: string,
    updatedChefData: Partial<IChef>,
    newRestaurant: IRestaurant[] = [],
    deletedRestaurant: IRestaurant[] = []
  ): Promise<IChef | null> {
    //update all new chef data except restaurants array
    let updatedChef = await Chef.findByIdAndUpdate(chefId, updatedChefData, {
      new: true,
    });

    if (!updatedChef) {
      return null;
    }

    //add new restaurants to the chef's restaurants array
    if (newRestaurant.length > 0) {
      newRestaurant.forEach((restaurantId: IRestaurant) => {
        updatedChef!.restaurants.push(restaurantId);
      });
    }

    //delete restaurants from the chef's restaurants array - Dont work!!!

    if (deletedRestaurant.length > 0) {
      updatedChef.restaurants = updatedChef.restaurants.filter(
        (restaurantId) => {
          !deletedRestaurant.includes(restaurantId);
        }
      );
    }

    // if (deletedRestaurant.length > 0) {
    //   deletedRestaurant.forEach(async (restaurant) => {
    //     await Chef.findByIdAndUpdate(chefId, {
    //       $pull: { restaurants: { restaurant } },
    //     });
    //   });
    // }

    console.log(updatedChef.restaurants);

    updatedChef = await updatedChef.save();

    return updatedChef;
  },
  async delete(chefId: string): Promise<IChef | null> {
    const deletedChef = await Chef.findByIdAndUpdate(
      chefId,
      { status: EStatus.DELETED },
      { new: true }
    );
    return deletedChef;
  },
};

export default ChefHandler;
