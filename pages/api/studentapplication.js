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

    // TRY MUI
    // const age = new Date.parse(age);

    const data = await executeQuery({
      /*----- COLS: 21 NOT including: id -----*/
      query: "INSERT INTO vastudents (name, gender, age, email, phone_number, alt_ph_num, country, state, city, disability, edu_qualifications, edu_details, employment_status, objectives, first_choice, second_choice, third_choice, visual_acuity, percent_loss, impairment_history, source, registration_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      values: [body.name, body.gender, body.age, body.email, body.phone_number, body.alt_ph_num, body.country, body.state, body.city, body.disability, body.edu_qualifications, body.edu_details, body.employment_status, body.objectives, body.first_choice, body.second_choice, body.third_choice, body.visual_acuity, body.percent_loss, body.impairment_history, body.source, currentDate],
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
