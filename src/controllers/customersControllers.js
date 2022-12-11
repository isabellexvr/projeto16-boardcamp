import { func } from "joi";
import { connectionDB } from "../database/db.js";

export async function getCostumers(req, res) {
  const { cpf } = req.query;
  try {
    if (cpf) {
      const { rows } = await connectionDB.query(
        "SELECT * FROM customers WHERE cpf LIKE $1;",
        [cpf + "%"]
      );
      return res.status(200).send(rows);
    }
    const { rows } = await connectionDB.query("SELECT * FROM customers;");
    res.status(200).send(rows);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
}

export async function getCostumerById(req, res) {
  const { id } = req.params;
  try {
    const { rows } = await connectionDB.query(
      "SELECT * FROM costumers WHERE id=$1;",
      [id]
    );
    if (rows.length < 1) {
      return res.status(404).send("Esse cliente não existe.");
    }
    res.status(200).send(rows);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
}

export async function postCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.body;
  try {
    await connectionDB.query(
      "INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);",
      [name, phone, cpf, birthday]
    );
    res.status(201).send("Cliente criado com sucesso!");
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
}

export async function attCustomer(res, res) {
  const { name, phone, cpf, birthday } = req.body;
  const { id } = req.params;
  try {
    await connectionDB.query(
      "UPDATE costumers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5;",
      [name, phone, cpf, birthday, id]
    );
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
}

/* {
    id: 1,
    name: 'João Alfredo',
    phone: '21998899222',
    cpf: '01234567890',
    birthday: '1992-10-05'
  } */
