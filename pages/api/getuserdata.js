// FILE CONTENTS: MySQL Courses table query

import { executeQuery } from "../../lib/db";

export default async function handler(req, res) {
  try {
    /* ---------------- DATA MODIFICATION SECTION --------------- */
    const querySQL = "SELECT email, role, isactive FROM vausers WHERE email = ?";
    const email = req.body.email;
    const valuesParams = [email];
    const data = await executeQuery({query: querySQL, values: valuesParams});
    res.status(200).json({ users: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
