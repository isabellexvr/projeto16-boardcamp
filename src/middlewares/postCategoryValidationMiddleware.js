import { connectionDB } from "../database/db.js";

export default async function postCategoryValidation(req, res, next) {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .send(
        "Não foi enviado nenhum nome de categoria. Cheque os dados enviados!"
      );
  }
  const { rows } = await connectionDB.query(
    "SELECT * FROM categories WHERE name=$1",
    [name]
  );
  if (rows.length > 0) {
    console.log(rows.length)
    return res
      .status(409)
      .send("Já existe uma categoria com esse mesmo nome! Pense noutro!");
  }
  next();
}
