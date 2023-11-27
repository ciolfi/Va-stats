import mysql from "mysql2/promise";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { id, email, name, phone_number, alt_ph_num, city, state, country, gender, age, edu_qualifications, edu_details, employment_status, first_choice, second_choice, third_choice, visual_acuity, percent_loss, impairment_history, source, registration_date } = req.body;

    const dbconnection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      database: process.env.MYSQL_DATABASE,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
    });

    try {
      const query = `
        UPDATE vastudents
        SET email = ?, name = ?, phone_number = ?, alt_ph_num = ?, city = ?, state = ?, country = ?, gender = ?, age = ?, edu_qualifications = ?, edu_details = ?, employment_status = ?, first_choice = ?, second_choice = ?, third_choice = ?, visual_acuity = ?, percent_loss = ?, impairment_history = ?, source = ?, registration_date = ?
        WHERE id = ?;
      `;

      const values = [email, name, phone_number, alt_ph_num, city, state, country, gender, age, edu_qualifications, edu_details, employment_status, first_choice, second_choice, third_choice, visual_acuity, percent_loss, impairment_history, source, registration_date, id];
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
