import { Router } from "express";
import * as chefController from "../../controllers/chef.controller";
import { authenticateToken } from "../../middleware/auth.middleware";

const chefRouter = Router();

chefRouter.get("/", chefController.getAll);
chefRouter.get("/chefOfTheWeek", chefController.getChefOfTheWeek);
chefRouter.get("/:id", chefController.getById);
chefRouter.post("/", authenticateToken, chefController.create);
chefRouter.put("/:id", authenticateToken, chefController.update);
chefRouter.delete("/:id", authenticateToken, chefController.deleteChef);

export default chefRouter;
