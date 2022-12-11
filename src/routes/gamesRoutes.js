import { Router } from "express";

import { postGame, getGames } from "../controllers/gamesControllers.js";
import postGameValidation from "../middlewares/postGameValidationMiddleware.js";

const gamesRouter = Router();

gamesRouter.get("/games", getGames);
gamesRouter.post("/games", postGameValidation, postGame);

export default gamesRouter;