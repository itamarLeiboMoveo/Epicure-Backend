import { Router } from "express";
import * as restaurantController from "../../controllers/restaurant.controller";
import { authenticateToken } from "../../middleware/auth.middleware";

const restaurantRouter = Router();

restaurantRouter.get("/", restaurantController.getAll);
restaurantRouter.get("/all", restaurantController.getAllWithoutPagination);
restaurantRouter.get("/:id", restaurantController.getById);
restaurantRouter.post("/", authenticateToken, restaurantController.create);
restaurantRouter.put("/:id", authenticateToken, restaurantController.update);
restaurantRouter.delete(
  "/:id",
  authenticateToken,
  restaurantController.deleteRestaurant
);

export default restaurantRouter;
