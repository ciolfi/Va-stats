import mysql from "mysql2/promise";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { id, email, name, phone_number, gender, age, location, objectives, vision_impairment, usable_vision, registration_date, is_qualified } = req.body;

    const dbconnection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      database: process.env.MYSQL_DATABASE,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
    });

    try {
      const query = `
        UPDATE vastudents
        SET email = ?, name = ?, phone_number = ?, gender = ?, age = ?, location = ?, objectives = ?, vision_impairment = ?, usable_vision = ?, registration_date = ?, is_qualified = ?
        WHERE id = ?;
      `;

      const values = [email, name, phone_number, gender, age, location, objectives, vision_impairment, usable_vision, registration_date, is_qualified, id];
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
