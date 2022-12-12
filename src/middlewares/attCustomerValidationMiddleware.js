import { connectionDB } from "../database/db.js";
import customerModel from "../models/customerModel.js";

export default async function attCustomerValidation(req, res, next) {
  const { id, name, phone, cpf, birthday } = req.body;
  const { error } = customerModel.validate(req.body);
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    console.log(errors);
    return res.status(400).send(errors);
  }
  try {
    const cpfExists = await connectionDB.query(
      "SELECT * FROM customers WHERE cpf=$1;",
      [cpf]
    );
    if (cpfExists.rows.length > 0 && cpfExists.rows[0].cpf !== cpf) {
      return res.status(409).send("Esse CPF já está cadastrado.");
    }
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
  next();
}
