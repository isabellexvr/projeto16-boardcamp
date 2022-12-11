import { Router } from "express";
import {
  getCostumers,
  getCostumerById,
  postCustomer,
  attCustomer,
} from "../controllers/customersControllers.js";
import customerValidation from "../middlewares/customerValidationMiddleware.js";

const customersRouter = Router();

customersRouter.get("/customers", getCostumers);

customersRouter.get("/customers/:id", getCostumerById);

customersRouter.use(customerValidation);

customersRouter.post("/customers", postCustomer);

customersRouter.put("/customers/:id", attCustomer);

export default customersRouter;
