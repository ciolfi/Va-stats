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
      /*- COLS: 19 (not including: id, registration_date) -*/
      query: "INSERT INTO vastudents (email, name, phone_number, alt_ph_num, city, state, gender, age, edu_qualifications, employment_status, objectives, trainer_name, first_choice, second_choice, third_choice, visual_acuity, percent_loss, impairment_history, source, registration_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      values: [body.email, body.name, body.phone_number, body.alt_ph_num, body.city, body.state, body.gender, body.age, body.edu_qualifications, body.employment_status, body.objectives, body.trainer_name, body.first_choice, body.second_choice, body.third_choice, body.visual_acuity, body.percent_loss, body.impairment_history, body.source, currentDate],
    });

  } catch (error) {
    console.log(error);
  }

  res.writeHead(301, {
    // Send user to blank Registration page
    Location: '/testreg'
  });
  res.end();
}
