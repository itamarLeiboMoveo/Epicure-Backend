import Restaurant from "../models/restaurant.model";
import Dish from "../models/dish.model";
import Chef from "../models/chef.model";

const SearchHandler = {
  async search(keyword: string) {
    const [restaurants, chefs, dishes] = await Promise.all([
      Restaurant.find({ title: { $regex: keyword, $options: "i" } }),
      Chef.find({ title: { $regex: keyword, $options: "i" } }),
      Dish.find({ title: { $regex: keyword, $options: "i" } }),
    ]);

    const searchResults = {
      restaurants,
      chefs,
      dishes,
    };

    return searchResults;
  },
};

export default SearchHandler;
