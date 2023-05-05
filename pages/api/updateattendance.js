import mysql from "mysql2/promise";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { batchId, studentId: studentObject } = req.body;
    //console.log(req.body);

    const attendanceDates = Object.keys(studentObject).filter(
      (key) => !isNaN(Date.parse(key))
    );

    const dbconnection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      database: process.env.MYSQL_DATABASE,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
    });

    try {
      for (const date of attendanceDates) {
        const isPresent = studentObject[date] == "1";

        const [rows] = await dbconnection.execute(
          "SELECT is_present FROM va_attendance WHERE batch_id = ? AND student_id = ? AND date = ?",
          [batchId, studentObject.id, date]
        );

        if (rows.length > 0 && rows[0].is_present !== isPresent) {
          await dbconnection.execute(
            "UPDATE va_attendance SET is_present = ? WHERE batch_id = ? AND student_id = ? AND date = ?",
            [isPresent, batchId, studentObject.id, date]
          );
        } else if (rows.length === 0) {
          await dbconnection.execute(
            "INSERT INTO va_attendance (is_present, batch_id, student_id, date) VALUES (?, ?, ?, ?)",
            [isPresent, batchId, studentObject.id, date]
          );
        }
      }

      res
        .status(200)
        .json({ success: true, message: "Attendance updated successfully" });
      dbconnection.end();
    } catch (error) {
      console.error("Error in handler:", error);
      res.status(500).json({ error: error.message });
    }

  } else {
    res.status(400).json({ message: "Invalid request method" });
  }
}
