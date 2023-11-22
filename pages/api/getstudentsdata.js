// FILE CONTENTS: MySQL Students table query

import mysql from "mysql2/promise";

export default async function handler(req, res) {
  const dbconnection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  });

  // Cols: 21, including ID
  try {
    const query = "SELECT id, email, name, phone_number, alt_ph_num, city, state, country, gender, age, edu_qualifications, edu_details, employment_status, objectives, first_choice, second_choice, third_choice, visual_acuity, percent_loss, impairment_history, source, registration_date FROM vastudents";

    const values = [];
    const [data] = await dbconnection.execute(query, values);
    res.status(200).json({ students: data });
    dbconnection.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
