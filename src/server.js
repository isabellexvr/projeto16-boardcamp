import express from "express";
import cors from "cors";
import categoriesRouter from "./routes/categoriesRoutes.js";
import gamesRouter from "./routes/gamesRoutes.js";
import customersRouter from "./routes/customersRoutes.js";
import rentalsRouter from "./routes/rentalsRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(rentalsRouter);
app.use(categoriesRouter);
app.use(gamesRouter);
app.use(customersRouter);



app.listen(4000, () => console.log("Server is running in port 4000"));
