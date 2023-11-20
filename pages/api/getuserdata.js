// FILE CONTENTS: MySQL Courses table query

import { executeQuery } from "../../lib/db";

export default async function handler(req, res) {
  try {
    /* ---------------- DATA MODIFICATION SECTION --------------- */
    const querySQL = "SELECT email, firstname, lastname, role, isactive FROM vausers WHERE email = ?";
    // const querySQL = "SELECT id, email, firstname, lastname, designation, joindate, mobilenumber, workbase, supervisor, natureofjob, visualacuity, trainingprogram1, trainingprogram2, trainingprogram3, role, isactive, action where id = ?";
    const email = req.body.email;
    const valuesParams = [email];
    const data = await executeQuery({query: querySQL, values: valuesParams});
    res.status(200).json({ users: data });
    // res.status(200).json({ vausers: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
