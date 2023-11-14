import mysql from "mysql2/promise";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { id, name, id_proof, disability_cert, photo, bank_details, fee_paid, amount_1, amount_2, amount_3, nature_of_fee } = req.body.studentId;

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

      await dbconnection.execute(
        "UPDATE va_fees SET fee_paid = ?, amount_1 = ?, amount_2 = ?, amount_3 = ?, nature_of_fee = ? WHERE batch_id = ? AND student_id = ?",
        [fee_paid, amount_1, amount_2, amount_3, nature_of_fee, req.body.batchId, id]
      );

      res.status(200).json({ message: 'Student updated successfully' });
      dbconnection.end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ message: 'Invalid request method' });
  }
}
