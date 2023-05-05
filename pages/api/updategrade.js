import mysql from "mysql2/promise";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { batchId, studentId: studentObject } = req.body;

    const assignments = Object.keys(studentObject).filter(
      (key) =>
        key !== "id" &&
        key !== "name"
    );

    const dbconnection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      database: process.env.MYSQL_DATABASE,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
    });

    try {
      for (const assignmentName of assignments) {
        const newGrade = studentObject[assignmentName];

        // Get grade
        const [rows] = await dbconnection.execute(
          "SELECT grade FROM va_grades WHERE batch_id = ? AND student_id = ? AND assignment_name = ?",
          [batchId, studentObject.id, assignmentName]
        );

        // update if different
        if (rows.length > 0 && rows[0].grade !== newGrade) {
          await dbconnection.execute(
            "UPDATE va_grades SET grade = ? WHERE batch_id = ? AND student_id = ? AND assignment_name = ?",
            [newGrade, batchId, studentObject.id, assignmentName]
          );
        }
      }

      res
        .status(200)
        .json({ success: true, message: "Grades updated successfully" });
      dbconnection.end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ message: "Invalid request method" });
  }
}
