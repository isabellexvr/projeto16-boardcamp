import { Router } from "express";
import { endRental, getRentals, postRental } from "../controllers/rentalsControllers.js";
import rentalsValidation from "../middlewares/rentalsValidationMiddleware.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals", getRentals);

rentalsRouter.post("/rentals", rentalsValidation, postRental);

rentalsRouter.post("/rentals/:id/return", endRental)

export default rentalsRouter;
