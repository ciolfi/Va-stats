import { executeQuery } from "../../lib/db";

export default async function handler(req, res) {
  const { assignmentName, batchId } = req.body;
  //console.log("REG  ", req.body);

  try {
    const students = await executeQuery({
      
      query: "SELECT s.id FROM vastudents s JOIN vastudent_to_batch sb ON s.id = sb.student_id WHERE sb.batch_id = ?",
      values: [batchId],
    });

    for (const student of students[0]) {
        //console.log('Student:', student);
        //console.log('Values:', [student.id, batchId, assignmentName, 0]);
        await executeQuery({
            query: "INSERT INTO va_grades (student_id, batch_id, assignment_name, grade) VALUES (?, ?, ?, ?)",
            values: [student.id, batchId, assignmentName, 0],
        });
    }

    res.status(200).json({ success: true });
  } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "An error occurred" });
  }
}
