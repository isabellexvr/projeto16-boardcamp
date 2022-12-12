import { connectionDB } from "../database/db.js";

export async function getCustomers(req, res) {
  const { cpf } = req.query;
  try {
    if (cpf) {
      const { rows } = await connectionDB.query(
        "SELECT *,birthday::text FROM customers WHERE cpf LIKE $1;",
        [cpf + "%"]
      );
      return res.status(200).send(rows);
    }
    const { rows } = await connectionDB.query(
      `SELECT *,birthday::text FROM customers ORDER BY id;`
    );
    res.status(200).send(rows);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
}

export async function getCustomerById(req, res) {
  const { id } = req.params;
  try {
    const { rows } = await connectionDB.query(
      "SELECT * FROM customers WHERE id=$1;",
      [Number(id)]
    );
    if (rows.length < 1) {
      return res.status(404).send("Esse cliente não existe.");
    }
    res.status(200).send(rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
}

export async function postCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.body;
  console.log(birthday);
  try {
    const cpfExists = await connectionDB.query("SELECT * FROM customers WHERE cpf=$1;", [cpf]);
    if(cpfExists.rows.length >0){
        return res.status(409).send("Esse CPF já está cadastrado.");
    }
    await connectionDB.query(
      "INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4));",
      [name, phone, cpf, birthday]
    );
    res.status(201).send("Cliente criado com sucesso!");
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
}

export async function attCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.body;

  const { id } = req.params;
  try {
    await connectionDB.query(
      "UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5;",
      [name, phone, cpf, birthday, id]
    );
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
}
