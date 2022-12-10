import express from "express";
import categoriesRouter from "./routes/categoriesRoutes.js";
import gamesRouter from "./routes/gamesRoutes.js";

const app = express();
app.use(express.json());

app.use(categoriesRouter);
app.use(gamesRouter);

app.listen(4000, () => console.log("Server is running in port 4000"));
