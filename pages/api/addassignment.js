import { executeQuery } from "../../lib/db";

export default async function handler(req, res) {
  const body = req.body;
  //console.log("REG  ", req.body);

  try {
    const students = await executeQuery({
      query: "SELECT s.id FROM vastudents s JOIN vastudent_to_batch sb ON s.id = sb.student_id WHERE sb.batch_id = ?",
      values: [body.batch_id],
    });

    for (const student of students[0]) {
        await executeQuery({
            query: "INSERT INTO va_grades (student_id, batch_id, assignment_name, assignment_type, assignment_weight, grade) VALUES (?, ?, ?, ?, ?, ?)",
            values: [student.id, body.batch_id, body.assignment_name, body.assignment_type, body.assignment_weight, 0],
        });
    }

    res.status(200).json({ success: true });
  } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "An error occurred" });
  }

  // res.writeHead(301, {
  //   Location: '/batch/'+body.batch_id,
  // });

  // res.end();
}
