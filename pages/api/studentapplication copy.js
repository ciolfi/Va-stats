/*
This function is called from students.jsx (Students link).
student registration form.
*/

import { executeQuery } from "../../lib/db";

export default async function handler(req, res) {

  try {
    const body = req.body;
    // const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const currentDate = new Date();
    const data = await executeQuery({
      /*- COLS: 22 (Below code does not including: id) -*/
      query: "INSERT INTO vastudents (email, name, phone_number, alt_ph_num, city, state, country, gender, age, edu_qualifications, employment_status, objectives, first_choice, second_choice, third_choice, visual_acuity, percent_loss, impairment_history, source, registration_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      values: [body.email, body.name, body.phone_number, body.alt_ph_num, body.city, body.state, body.country, body.gender, body.age, body.edu_qualifications, body.employment_status, body.objectives, body.first_choice, body.second_choice, body.third_choice, body.visual_acuity, body.percent_loss, body.impairment_history, body.source, currentDate],
    });
  } catch (error) {
    console.log(error);
  }

  res.writeHead(301, {
    // Forward the user to the Student Registration page
    Location: '/studentregistration'
  });
  res.end();
}
