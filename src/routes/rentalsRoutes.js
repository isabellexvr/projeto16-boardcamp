import { Router } from "express";
import { endRental, getRentals, postRental, deleteRental } from "../controllers/rentalsControllers.js";
import rentalsValidation from "../middlewares/rentalsValidationMiddleware.js";
import rentalIdValidation from "../middlewares/rentalIdValidationMiddlware.js";

const rentalsRouter = Router();

rentalsRouter.get("/rentals", getRentals);

rentalsRouter.post("/rentals", rentalsValidation, postRental);

rentalsRouter.post("/rentals/:id/return", rentalIdValidation, endRental);

rentalsRouter.delete("/rentals/:id", rentalIdValidation, deleteRental)

export default rentalsRouter;
