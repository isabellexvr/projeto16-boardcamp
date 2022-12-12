import { connectionDB } from "../database/db.js";

export async function getCategories(req, res) {
  try {
    const { rows } = await connectionDB.query("SELECT * FROM categories;");
    res.status(200).send(rows)
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
}

export async function postCategory(req, res) {
  const {name} = req.body;
  try{
    await connectionDB.query("INSERT INTO categories (name) VALUES ($1);", [name]);
    res.status(201).send("Categoria criada com sucesso!")
  }catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
}
