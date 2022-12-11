import customerModel from "../models/customerModel.js";
import { connectionDB } from "../database/db.js";

export default async function customerValidation (req, res, next) {
  const { error } = customerModel.validate(req.body);
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).send(errors);
  }
  try {
    const { cpf } = req.body;
    const cpfExists = await connectionDB.query("SELECT * FROM costumers WHERE cpf=$1", [cpf]);
    if(cpfExists.rows.length >0){
        return res.status(409).send("Esse CPF já está cadastrado.");
    }
  } catch (err) {}
  next();
}

