import mysql from "mysql2/promise";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { id, course, description, duration, duration_type } = req.body;

    const dbconnection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      database: process.env.MYSQL_DATABASE,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
    });

    try {
      const query = `
        UPDATE vacourses
        SET course = ?, description = ?, duration = ?, duration_type = ?
        WHERE id = ?;
      `;

      const values = [course, description, duration, duration_type, id];
      await dbconnection.execute(query, values);
      res.status(200).json({ message: 'Course updated successfully' });
      dbconnection.end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ message: 'Invalid request method' });
  }
}
