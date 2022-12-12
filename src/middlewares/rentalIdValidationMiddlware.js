import { connectionDB } from "../database/db.js";

export default async function rentalIdValidation(req, res, next) {

const {id} = req.params

  try {
    const { rows } = await connectionDB.query(
      `SELECT * FROM rentals WHERE id=$1`,
      [id]
    );
    if (rows.length < 1) {
      return res.status(404).send("Esse aluguel não existe.");
    }
    res.locals.rows = rows
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
  next();
}
