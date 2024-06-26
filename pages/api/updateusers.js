import mysql from "mysql2/promise";

export default async function handler(req, res) {
  if (req.method === 'POST') {   
    const { id, email, firstname, lastname, designation, joindate, mobilenumber, workbase, supervisor, natureofjob, visualacuity, trainingprogram1, trainingprogram2, trainingprogram3, role, isactive, action, lastlogin } = req.body;
    console.log({ id, email, firstname, lastname, designation, joindate, mobilenumber, workbase, supervisor, natureofjob, visualacuity, trainingprogram1, trainingprogram2, trainingprogram3, role, isactive, action, lastlogin })
    const dbconnection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      database: process.env.MYSQL_DATABASE,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
    });

    try {

      const query = `UPDATE vausers SET email = ?, firstname = ?, lastname = ?, designation = ?, joindate = ?, mobilenumber = ?, workbase = ?, supervisor = ?, natureofjob = ?, visualacuity = ?, trainingprogram1 = ?, trainingprogram2= ?, trainingprogram3 = ?, role = ?, isactive = ?, action = ?, lastlogin = ? WHERE id = ?;`;

      // 'id' must be at end of the const, not beginning
      const values = [email, firstname, lastname, designation, new Date(joindate), mobilenumber, workbase, supervisor, natureofjob, visualacuity, trainingprogram1, trainingprogram2, trainingprogram3, role, isactive, action, new Date(lastlogin), id];

      await dbconnection.execute(query, values);
      res.status(200).json({ message: 'User updated successfully' });
      dbconnection.end();
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ message: 'Invalid request method' });
  }
}
