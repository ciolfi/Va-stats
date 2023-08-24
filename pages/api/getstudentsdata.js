// FILE CONTENTS: MySQL Students table query

import mysql from "mysql2/promise";

export default async function handler(req, res) {
  const dbconnection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  });

  try {
    // ORIG VERSION (18 cols)
    const query = "SELECT id, email, name, simg, phone_number, alt_ph_num, gender, age, edu_qualifications, courses, location, objectives, vision_impairment, usable_vision, total_vision_loss, source, is_qualified,registration_date FROM vastudents";
    // const query = "SELECT * FROM vastudents";

    // NEW VERSION
    // const query = "SELECT id, email, name, phone_number, alt_ph_num, city, state, gender, age, edu_qualifications, employment_status, objectives, trainer_name, first_choice, second_choice,third_choice,visual_acuity, percent_loss,impairment_history,source, registration_date FROM vastudents";

    const values = [];
    const [data] = await dbconnection.execute(query, values);
    res.status(200).json({ students: data });
    dbconnection.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
