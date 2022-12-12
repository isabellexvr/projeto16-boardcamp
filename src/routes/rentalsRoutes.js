import { Router } from "express";
import { getRentals, postRental } from "../controllers/rentalsControllers.js";
import rentalsValidation from "../middlewares/rentalsValidationMiddleware.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals", getRentals);

rentalsRouter.post("/rentals", rentalsValidation, postRental);

export default rentalsRouter;
