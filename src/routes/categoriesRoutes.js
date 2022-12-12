import { Router } from "express";
import {
  getCategories,
  postCategory,
} from "../controllers/categoriesControllers.js";
import postCategoryValidation from "../middlewares/postCategoryValidationMiddleware.js";

const categoriesRouter = Router();

categoriesRouter.get("/categories", getCategories);

categoriesRouter.post("/categories", postCategoryValidation, postCategory);

export default categoriesRouter;
