import { Router } from "express";
import {
  getCustomers,
  getCustomerById,
  postCustomer,
  attCustomer,
} from "../controllers/customersControllers.js";
import customerValidation from "../middlewares/customerValidationMiddleware.js";

const customersRouter = Router();

customersRouter.get("/customers", getCustomers);

customersRouter.get("/customers/:id", getCustomerById);

customersRouter.use(customerValidation);

customersRouter.post("/customers", postCustomer);

customersRouter.put("/customers/:id", attCustomer);

export default customersRouter;
