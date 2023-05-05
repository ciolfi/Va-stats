import mysql from "mysql2/promise";

export default async function deleteUser(req, res) {
    
  try {
    const { id } = req.body;

    const dbconnection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      database: process.env.MYSQL_DATABASE,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
    });

    try {
      const query = `
        DELETE FROM vausers
        WHERE id = ?;
      `;

      const values = [id];
      await dbconnection.execute(query, values);
      res.status(200).json({ message: 'User deleted successfully' });
      dbconnection.end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid request method' });
  }
}
