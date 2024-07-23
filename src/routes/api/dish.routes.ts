import { Router } from "express";
import * as dishController from "../../controllers/dish.controller";
import { authenticateToken } from "../../middleware/auth.middleware";

const dishRouter = Router();

dishRouter.get("/", dishController.getAll);
dishRouter.get("/:id", dishController.getById);
dishRouter.post("/", authenticateToken, dishController.create);
dishRouter.put("/:id", authenticateToken, dishController.update);
dishRouter.delete("/:id", authenticateToken, dishController.deleteDish);

export default dishRouter;
