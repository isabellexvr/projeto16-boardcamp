import { Router } from "express";
import {
  getCostumers,
  getCostumerById,
  postCustomer,
} from "../controllers/customersControllers.js";
import customerValidation from "../middlewares/customerValidationMiddleware.js";

const customersRouter = Router();
customersRouter.get("/customers", getCostumers);
customersRouter.get("/customers/:id", getCostumerById);
customersRouter.post("/customers", customerValidation, postCustomer);

export default customersRouter;
