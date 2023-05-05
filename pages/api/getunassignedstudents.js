import mysql from "mysql2/promise";

export default async function handler(req, res) {
  const { batch_id } = req.body;
  
  const dbconnection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  });

  try {
    const studentsQuery = `
  SELECT id, name
    FROM vastudents
    WHERE id NOT IN (
      SELECT student_id
      FROM vastudent_to_batch
      WHERE batch_id = ?)
    `;

    const [studentsData] = await dbconnection.execute(studentsQuery, [batch_id]);
 
    res.status(200).json({
      students: studentsData,
    });

    dbconnection.end();
  } catch (error) {
     res.status(500).json({ error: error.message });
  }
}
