/* This function is called from users.jsx (Staff link). */

import { executeQuery } from "../../lib/db";

export default async function handler(req, res) {
  try {
    // Get data submitted in request body
    const body = req.body;

    // View response object in terminal
    // console.log('BODY****: ', body);

    const data = await executeQuery({
      /* ---------- DATABASE MODIFICATION SECTION ------------- */
      // If timestamp is a field, use: user.createdAt.Date (not toString)
      query: "INSERT INTO vausers (email, firstname, lastname, designation, joindate, mobilenumber, workbase, supervisor, natureofjob, visualacuity, trainingprogram1, trainingprogram2, trainingprogram3, role, isactive, action) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      values: [body.email, body.firstname, body.lastname, body.designation, body.joindate, body.mobilenumber, body.workbase, body.supervisor, body.natureofjob, body.visualacuity, body.trainingprogram1, body.trainingprogram2, body.trainingprogram3, body.role, '1', body.action],
    });

  } catch (error) {
    console.log(error);
  }

  res.writeHead(301, {
    Location: '/users',
  });

  res.end();
}
