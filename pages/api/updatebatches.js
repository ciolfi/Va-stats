import mysql from "mysql2/promise";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { id, coursename, batch, coursestart, courseend, coursedays, coursetimes, instructor, PM, TA, cost, currency, trainingmode, status } = req.body;

    const dbconnection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      database: process.env.MYSQL_DATABASE,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
    });

    try {
      const query = `
        UPDATE vabatches
        SET coursename = ?, batch = ?, coursestart = ?, courseend = ?, coursedays = ?, coursetimes = ?, instructor = ?, PM = ?, TA = ?, cost = ?, currency = ?, trainingmode = ?, status = ?
        WHERE id = ?;
      `;

      const values = [coursename, batch, coursestart, courseend, coursedays, coursetimes, instructor, PM, TA, cost, currency, trainingmode, status, id];
      await dbconnection.execute(query, values);
      res.status(200).json({ message: 'Batch updated successfully' });
      dbconnection.end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ message: 'Invalid request method' });
  }
}
