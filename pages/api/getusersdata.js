// FILE CONTENTS: MySQL Users table query

import mysql from "mysql2/promise";

export default async function handler(req, res) {
  const dbconnection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  });
  try {
    const query = "SELECT id, email, firstname, lastname, designation, joindate, mobilenumber, workbase, supervisor, natureofjob, visualacuity, trainingprogram1, trainingprogram2, trainingprogram3, role, isactive, action FROM vausers";

    const values = [];
    const [data] = await dbconnection.execute(query, values);
    res.status(200).json({ users: data });
    dbconnection.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
