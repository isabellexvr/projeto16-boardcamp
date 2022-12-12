import { connectionDB } from "../database/db.js";
import rentalsModel from "../models/rentalsModel.js";

export default async function rentalsValidation(req, res, next) {
  const rent = req.body;
  const { error } = rentalsModel.validate(rent);
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).send(errors);
  }
  try {
    const customerExists = await connectionDB.query(
      "SELECT * FROM customers WHERE id=$1",
      [rent.customerId]
    );
    if (customerExists.rows.length < 1) {
      return res.status(400).send("Esse cliente não existe.");
    }
    const gameExists = await connectionDB.query(
      "SELECT * FROM games WHERE id=$1",
      [rent.gameId]
    );
    if (gameExists.rows.length < 1) {
      return res.status(400).send("Esse jogo não existe.");
    }
    if (rent.daysRented <= 0) {
      return res
        .status(400)
        .send(
          "O número de dias para um jogo ser alugado deve ser maior que zero."
        );
    }
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
  next();
}
