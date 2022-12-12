import { connectionDB } from "../database/db.js";
import dayjs from "dayjs";

function makeFinalObj(rows) {
  const finalObj = rows.map((r) => ({
    id: r.id,
    customerId: r.customerId,
    gameId: r.gameId,
    rentDate: r.rentDate,
    daysRented: r.daysRented,
    returnDate: r.returnDate,
    originalPrice: r.originalPrice,
    delayFee: r.delayFee,
    customer: {
      id: r.customerId,
      name: r.customerName,
    },
    game: {
      id: r.gameId,
      name: r.gameName,
      categoryId: r.categoryId,
      categoryName: r.categoryName,
    },
  }));
  return finalObj;
}

const compareDates = (d1, d2) => {
  let date1 = new Date(d1).getTime();
  let date2 = new Date(d2).getTime();

  if (date1 < date2) {
    console.log(`${d1} is less than ${d2}`);
  } else if (date1 >= date2) {
    console.log(`${d1} is greater or equal than ${d2}`);
    return date1 / (1000 * 60 * 60 * 24) - date2 / (1000 * 60 * 60 * 24);
  } else {
    console.log(`Both dates are equal`);
  }
};

export async function getRentals(req, res) {
  const { customerId, gameId } = req.query;
  try {
    if (customerId) {
      const { rows } = await connectionDB.query(
        `SELECT rentals.*,"rentDate"::text,"returnDate"::text, games.name AS "gameName", games."categoryId", customers.name AS "customerName", categories.name AS "categoryName" FROM rentals JOIN games ON rentals."gameId"=games.id JOIN customers ON rentals."customerId"=customers.id JOIN categories ON games."categoryId"=categories.id WHERE rentals."customerId"=$1
        ORDER BY id
        ;`,
        [customerId]
      );
      return res.status(200).send(makeFinalObj(rows));
    }
    if (gameId) {
      const { rows } = await connectionDB.query(
        `SELECT rentals.*,"rentDate"::text,"returnDate"::text, games.name AS "gameName", games."categoryId", customers.name AS "customerName", categories.name AS "categoryName" FROM rentals JOIN games ON rentals."gameId"=games.id JOIN customers ON rentals."customerId"=customers.id JOIN categories ON games."categoryId"=categories.id WHERE rentals."gameId"=$1
        ORDER BY id
        ;`,
        [gameId]
      );
      return res.status(200).send(makeFinalObj(rows));
    }
    const { rows } = await connectionDB.query(
      `SELECT 
        rentals.*,"rentDate"::text,"returnDate"::text,
        games.name AS "gameName", games."categoryId",
        customers.name AS "customerName",
        categories.name AS "categoryName" 
      FROM rentals
      JOIN games ON rentals."gameId"=games.id 
      JOIN customers ON rentals."customerId"=customers.id 
      JOIN categories ON games."categoryId"=categories.id
      ORDER BY id
      ;`
    );

    res.send(makeFinalObj(rows));
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
}

export async function postRental(req, res) {
  const rent = req.body;
  try {
    const game = await connectionDB.query(
      `SELECT "pricePerDay", "stockTotal" FROM games WHERE id=$1`,
      [rent.gameId]
    );
    const rentals = await connectionDB.query(
      `SELECT * FROM rentals WHERE "gameId"=$1`,
      [rent.gameId]
    );
    if (rentals.rows.length >= game.rows[0].stockTotal) {
      return res
        .status(400)
        .send("Não há jogos disponíveis para aluguel no momento.");
    }
    const finalRent = {
      customerId: rent.customerId,
      gameId: rent.gameId,
      rentDate: `${dayjs().year()}-${dayjs().month() + 1}-${dayjs().date()}`,
      daysRented: rent.daysRented,
      returnDate: null,
      originalPrice: rent.daysRented * game.rows[0].pricePerDay,
      delayFee: null,
    };

    await connectionDB.query(
      `INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        finalRent.customerId,
        finalRent.gameId,
        finalRent.rentDate,
        finalRent.daysRented,
        finalRent.returnDate,
        finalRent.originalPrice,
        finalRent.delayFee,
      ]
    );

    res.status(201).send("Aluguel criado com sucesso.");
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
}

export async function endRental(req, res) {
  const { id } = req.params;
  try {
    const { rows } = await connectionDB.query(
      `SELECT *,"rentDate"::text FROM rentals WHERE id=$1`,
      [id]
    );
    if (rows.length < 1) {
      return res.status(404).send("Esse aluguel não existe.");
    }
    if (rows[0].returnDate !== null) {
      return res.status(400).send("Esse aluguel já foi finalizado.");
    }
    const presentDate = `${dayjs().year()}-${dayjs().month() + 1}-${
      dayjs().date().toString().length <= 1
        ? "0" + dayjs().date()
        : dayjs().date()
    }`;
    const delayFee =
      compareDates(presentDate, rows[0].rentDate) * rows[0].originalPrice;
    await connectionDB.query(
      `UPDATE rentals SET "returnDate"=$1, "delayFee"=$2 WHERE id=$3`,
      [presentDate, delayFee, id]
    );
    res.status(200).send("Aluguel finalizado com sucesso.");
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
}
//returnDate = data atual
//delayFee = dias de atraso * preço por dia do jogo
