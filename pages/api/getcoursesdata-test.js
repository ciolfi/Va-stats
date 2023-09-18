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
    const query = "SELECT course FROM vacourses";
    // const query = SELECT JSON_ARRAYAGG(JSON_OBJECT('course', course)) from vacourses;
    // const query = SELECT CONCAT('[', GROUP_CONCAT(JSON_OBJECT('course', course)),']') FROM vacourses;
    // const query = SELECT json_object: any('course', course) FROM vacourses;
    // const query = "SELECT json_object('course', course) FROM vacourses";

    const values = [];
    const [data] = await dbconnection.execute(query, values);
    res.status(200).json({ courses: data });
    console.log("API page data: ", data);
    // res.send(data);   // TRY
    dbconnection.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
