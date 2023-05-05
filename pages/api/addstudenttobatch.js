import { executeQuery } from "../../lib/db";

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function isClassInSession(dayOfWeek, courseDays) {
  const daysMap = {
    'Su': 0,
    'M': 1,
    'T': 2,
    'W': 3,
    'Th': 4,
    'F': 5,
    'Sa': 6,
  };
  for (const courseDay of courseDays) {
    if (daysMap[courseDay] === dayOfWeek) {
      return true;
    }
  }
  return false;
}

function generateDateArray(startDate, endDate, courseDays) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const dateArray = [];
  const currentDate = new Date(start);

  while (currentDate <= end) {
    if (isClassInSession(currentDate.getDay(), courseDays)) {
      dateArray.push(formatDate(currentDate));
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  //console.log('data array ', dateArray);

  return dateArray;
}

async function createAttendanceRecords(batch_id, student_id, coursestart, courseend, coursedays) {
  const dateArray = generateDateArray(coursestart, courseend, coursedays);

  const attendanceInsertQuery = `
    INSERT INTO va_attendance (batch_id, student_id, date, is_present)
    VALUES (?, ?, ?, ?)
  `;

  for (const date of dateArray) {
    //console.log(date);
    try {
      await executeQuery({
        query: attendanceInsertQuery,
        values: [batch_id, student_id, date, false],
      });
    } catch (error) {
      console.log('Error inserting attendance record:', error);
    }
  }
}

export default async function handler(req, res) {
  const { studentId, batchId } = req.body;


  try {
    await executeQuery({
      query: "INSERT INTO vastudent_to_batch (student_id, batch_id) VALUES (?, ?)",
      values: [studentId, batchId],
    });

    const result = await executeQuery({
      query: "SELECT DISTINCT assignment_name FROM va_grades WHERE batch_id = ? AND assignment_name IS NOT NULL",
      values: [batchId],
    });

    //console.log(" result:", result);

    const assignments = result[0].map((assignment) => assignment.assignment_name);

    const courseDatesResult = await executeQuery({
      query: "SELECT coursestart, courseend, coursedays FROM vabatches WHERE id = ?",
      values: [batchId],
    });

    const coursestart = courseDatesResult[0][0].coursestart;
    const courseend = courseDatesResult[0][0].courseend;
    const coursedays = courseDatesResult[0][0].coursedays.match(/(Su|M|T|W|Th|F|Sa)/g);

    await createAttendanceRecords(batchId, studentId, coursestart, courseend, coursedays);

   //console.log("Assignments:", assignments);

    if (assignments && assignments.length > 0) {
      for (const assignment of assignments) {
        if (typeof assignment !== "undefined") {
          await executeQuery({
            query: "INSERT INTO va_grades (student_id, batch_id, assignment_name) VALUES (?, ?, ?)",
            values: [studentId, batchId, assignment],
          });
        } else {
          console.log("skipping");
        }
      }
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "An error occurred" });
  }
}
