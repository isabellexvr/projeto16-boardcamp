import { Router } from "express";

import { postGame, getGames } from "../controllers/gamesControllers.js";
import postGameValidation from "../middlewares/postCategoryValidationMiddleware.js";

const gamesRouter = Router();

gamesRouter.get("/games", getGames);
gamesRouter.post("/games", postGame);

export default gamesRouter;