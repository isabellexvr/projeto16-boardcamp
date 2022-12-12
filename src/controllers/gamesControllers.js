import { connectionDB } from "../database/db.js";

export async function getGames(req, res) {
  const { name } = req.query;

  try {
    if (name) {
      const { rows } = await connectionDB.query(
        "SELECT * FROM games WHERE name LIKE $1;",
        ["%" + name + "%"]
      );
      return res.status(200).send(rows);
    }
    const { rows } = await connectionDB.query("SELECT * FROM games;");
    res.status(200).send(rows);
  } catch (err) {
    console.log(err);
  }
}

export async function postGame(req, res) {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.body;
  try {
    await connectionDB.query(
      `INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5);`,
      [name, image, stockTotal, categoryId, pricePerDay]
    );
    res.status(201).send("Jogo criado com sucesso!");
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
}
