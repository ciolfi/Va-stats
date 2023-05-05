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
    const query = "SELECT id, course, description, duration, duration_type FROM vacourses";

    const values = [];
    const [data] = await dbconnection.execute(query, values);
    res.status(200).json({ courses: data });
    dbconnection.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
