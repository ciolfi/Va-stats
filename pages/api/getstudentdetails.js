import mysql from "mysql2/promise";

export default async function handler(req, res) {
  const { student_id } = req.body;
  
  const dbconnection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  });

  try {
    const studentsQuery = `
      SELECT b.id, b.coursename, b.batch, b.coursestart, b.courseend, b.instructor, b.status
      FROM vabatches b
      JOIN vastudent_to_batch sb ON b.id = sb.batch_id
      WHERE sb.student_id = ?
    `;

    const studentNameQuery = `
      SELECT name
      FROM vastudents
      WHERE id = ?
    `;


    const [studentsData] = await dbconnection.execute(studentsQuery, [student_id]);
    const [studentNameData] = await dbconnection.execute(studentNameQuery, [student_id]);
 


    res.status(200).json({
      batches: studentsData,
      name: studentNameData[0].name,
    });

    dbconnection.end();
  } catch (error) {
     res.status(500).json({ error: error.message });
  }
}
