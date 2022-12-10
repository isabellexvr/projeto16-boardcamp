import { Router } from "express";
import {
  createCategory,
  postCategory,
} from "../controllers/categoriesControllers.js";
import postCategoryValidation from "../middlewares/postCategoryValidationMiddleware.js";

const categoriesRouter = Router();

categoriesRouter.get("/categories", createCategory);
categoriesRouter.post("/categories", postCategoryValidation, postCategory);

export default categoriesRouter;
