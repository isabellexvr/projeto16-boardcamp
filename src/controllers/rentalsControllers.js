import { connectionDB } from "../database/db.js";
import dayjs from "dayjs";
/* 
{
    id: 1,
    customerId: 1,
    gameId: 1,
    rentDate: '2021-06-20',    // data em que o aluguel foi feito
    daysRented: 3,             // por quantos dias o cliente agendou o aluguel
    returnDate: null,          // data que o cliente devolveu o jogo (null enquanto não devolvido)
    originalPrice: 4500,       // preço total do aluguel em centavos (dias alugados vezes o preço por dia do jogo)
    delayFee: null             // multa total paga por atraso (dias que passaram do prazo vezes o preço por dia do jogo)
  } */

export async function getRentals(req, res) {
  const { customerId } = req.query;
  try {
    if (customerId) {
      const { rows } = await connectionDB.query(
        "SELECT rentals.*, customer.id, customer.name, game.id, game.name FROM rentals"
      );
      res.send(rows);
    }
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
}

export async function postRental(req, res) {
  const rent = req.body;
  try {
    const game = await connectionDB.query(
      `SELECT "pricePerDay" FROM games WHERE id=$1`,
      [rent.gameId]
    );
    const finalRent = {
      customerId: rent.customerId,
      gameId: rent.gameId,
      rendDate: `${dayjs().year()}-${dayjs().month() + 1}-${dayjs().day()}`,
      daysRented: rent.daysRented,
      returnDate: null,
      originalPrice: (rent.daysRented * game.rows[0].pricePerDay),
      delayFee: null,
    };
      await connectionDB.query(
      `INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        finalRent.customerId,
        finalRent.gameId,
        finalRent.rendDate,
        finalRent.daysRented,
        finalRent.returnDate,
        finalRent.originalPrice,
        finalRent.delayFee,
      ]
    );  

    res.status(201).send(finalRent);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
}

/* [
    {
      id: 1,
      customerId: 1,
      gameId: 1,
      rentDate: '2021-06-20',
      daysRented: 3,
      returnDate: null, // troca pra uma data quando já devolvido
      originalPrice: 4500,
      delayFee: null,
      customer: {
       id: 1,
       name: 'João Alfredo'
      },
      game: {
        id: 1,
        name: 'Banco Imobiliário',
        categoryId: 1,
        categoryName: 'Estratégia'
      }
    }
  ] */
