import { executeQuery } from "../../lib/db";

export default async function handler(req, res) {
  const body = req.body;
  const assignmentData = body.assignmentData;

  try {

    await executeQuery({
        query: `UPDATE va_grades SET assignment_name = ?, assignment_type = ?, assignment_weight = ? WHERE batch_id = ? AND assignment_name = ?`,
        values: [assignmentData.assignment_name, assignmentData.assignment_type, assignmentData.assignment_weight, body.batchId, assignmentData.id],
    });

    res.status(200).json({ success: true });
  } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "An error occurred" });
  }
}
