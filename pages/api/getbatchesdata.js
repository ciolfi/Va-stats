// FILE CONTENTS: MySQL Courses table query

// import { query } from "../../lib/db";
import mysql from "mysql2/promise";

export default async function handler(req, res) {
  const dbconnection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  });
  try {

    /* ---------------- DATA MODIFICATION SECTION --------------- */
    const query = "SELECT id, coursename, batch, coursestart, courseend, coursedays, coursetimes, instructor, PM, TA, cost, currency, trainingmode, status FROM vabatches";

    const values = [];
    const [data] = await dbconnection.execute(query, values);
    res.status(200).json({ batches: data });
    dbconnection.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
