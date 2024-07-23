import { Router } from "express";
import chefsApiRoutes from "./chef.routes";
import dishesApiRoutes from "./dish.routes";
import restaurantsApiRoutes from "./restaurant.routes";
import searchApiRoutes from "./search.routes";
import userApiRoutes from "./user.routes";

const v1Router = Router();

v1Router.use("/chefs", chefsApiRoutes);
v1Router.use("/dishes", dishesApiRoutes);
v1Router.use("/restaurants", restaurantsApiRoutes);
v1Router.use("/search", searchApiRoutes);
v1Router.use("/users", userApiRoutes);

export default v1Router;
