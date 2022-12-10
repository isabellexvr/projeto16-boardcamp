import { connectionDB } from "../database/db.js";

/* 
FORMATO DE UMA CATEGORIA DA TABELA categories
{
    id: 1,
    name: 'Estratégia',
  } */

export async function createCategory(req, res) {
  try {
    //já trás a propriedade rows desestruturada xd
    const { rows } = await connectionDB.query("SELECT * FROM categories;");
    res.send(rows)
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export async function postCategory(req, res) {
  const {name} = req.body;
  try{
    await connectionDB.query("INSERT INTO categories (name) VALUES ($1)", [name]);
    res.status(201).send("Categoria criada com sucesso!")
  }catch (err){

  }
}
