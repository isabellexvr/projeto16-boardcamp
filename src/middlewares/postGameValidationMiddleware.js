import { connectionDB } from "../database/db.js";
import postGameModel from "../models/postGameModel.js";

export default async function postGameValidation(req, res, next) {
  const {name} = req.body
  const {error} = postGameModel.validate(req.body);
  if(error){
    const errors = error.details.map((detail) => detail.message)
    return res.send(errors);
  }
  const nameExists = await connectionDB.query(
    "SELECT * FROM games WHERE name=$1;",
    [name]
  );
  if (nameExists.rows.length > 0) {
    return res
      .status(409)
      .send("Já existe um game com esse nome. Tente outro.");
  }
  if (stockTotal <= 0 || pricePerDay <= 0) {
    return res
      .status(400)
      .send("O estoque e o preço por dia devem ser maiores que zero.");
  }
  const { rows } = await connectionDB.query(
    "SELECT * FROM categories WHERE id=$1;",
    [categoryId]
  );
  if (rows.length < 1) {
    return res.status(400).send("Esse id de categoria não é válido.");
  }
  next();
}
