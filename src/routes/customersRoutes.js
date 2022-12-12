import { Router } from "express";
import {
  getCustomers,
  getCustomerById,
  postCustomer,
  attCustomer,
} from "../controllers/customersControllers.js";
import customerValidation from "../middlewares/customerValidationMiddleware.js";
import attCustomerValidation from "../middlewares/attCustomerValidationMiddleware.js";

const customersRouter = Router();

customersRouter.get("/customers", getCustomers);

customersRouter.get("/customers/:id", getCustomerById);


customersRouter.post("/customers",customerValidation, postCustomer);

customersRouter.put("/customers/:id", attCustomerValidation, attCustomer);

export default customersRouter;
