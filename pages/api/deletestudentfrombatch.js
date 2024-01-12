import { executeQuery } from "../../lib/db";

export default async function handler(req, res) {
  const { studentId, batchId } = req.body;

  try {
    // Delete attendance records
    try {
      await executeQuery({
        query: "DELETE FROM va_attendance WHERE batch_id = ? AND student_id = ?",
        values: [batchId, studentId],
      });
    } catch (error) {
      console.log('Error deleting attendance record:', error);
    }

    // Delete grades records
    try {
      await executeQuery({
        query: "DELETE FROM va_grades WHERE batch_id = ? AND student_id = ?",
        values: [batchId, studentId],
      });
    } catch (error) {
      console.log('Error deleting grades record:', error);
    }

    // Delete document and fees records
    try {
      await executeQuery({
        query: "DELETE FROM va_fees WHERE batch_id = ? AND student_id = ?",
        values: [batchId, studentId],
      });
    } catch (error) {
      console.log('Error deleting documents and fees record:', error);
    }

    // Delete Student-batch link
    try {
      await executeQuery({
        query: "DELETE FROM vastudent_to_batch WHERE batch_id = ? AND student_id = ?",
        values: [batchId, studentId],
      });
    } catch (error) {
      console.log('Error deleting student to batch record:', error);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "An error occurred" });
  }
}
