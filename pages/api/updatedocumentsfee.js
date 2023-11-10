import mysql from "mysql2/promise";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { id, name, id_proof, disability_cert, photo, bank_details } = req.body.studentId;

    const dbconnection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      database: process.env.MYSQL_DATABASE,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
    });

    try {
      const query = `
        UPDATE vastudents
        SET id_proof = ?, disability_cert = ?, photo = ?, bank_details = ?
        WHERE id = ?;
      `;

      const values = [id_proof, disability_cert, photo, bank_details, id];
      await dbconnection.execute(query, values);
      res.status(200).json({ message: 'Student updated successfully' });
      dbconnection.end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ message: 'Invalid request method' });
  }
}
