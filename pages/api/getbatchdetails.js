import mysql from "mysql2/promise";

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
    //console.log('dayOfWeek:', dayOfWeek, 'daysMap[courseDay]:', daysMap[courseDay]);

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

  return dateArray;
}


export default async function handler(req, res) {
  const { batch_id } = req.body;
  
  const dbconnection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  });

  try {
    const studentsQuery = `
      SELECT s.id, s.email, s.name
      FROM vastudents s
      JOIN vastudent_to_batch sb ON s.id = sb.student_id
      WHERE sb.batch_id = ?
    `;

    const gradesQuery = `
      SELECT student_id, assignment_name, grade
      FROM va_grades
      WHERE batch_id = ?
    `;

    const attendanceQuery = `
      SELECT student_id, date, is_present, coursestart, courseend, vabatches.coursedays
      FROM va_attendance
      JOIN vabatches ON va_attendance.batch_id = vabatches.id
      WHERE va_attendance.batch_id = ?
    `;

    const courseAndBatchNameQuery = `
      SELECT coursename, batch
      FROM vabatches
      WHERE id = ?
    `;


    const [studentsData] = await dbconnection.execute(studentsQuery, [batch_id]);
    const [gradesData] = await dbconnection.execute(gradesQuery, [batch_id]);
    const [attendanceData] = await dbconnection.execute(attendanceQuery, [batch_id]);
    const [courseAndBatchNameData] = await dbconnection.execute(courseAndBatchNameQuery, [batch_id]);

    let attendance = [];
    if (attendanceData.length > 0) {
      const { coursestart, courseend, coursedays } = attendanceData[0];
      //console.log(coursedays);
      //console.log(coursestart);
      //console.log(courseend);

      const dateArray = generateDateArray(coursestart, courseend, coursedays.match(/(Su|Sa|Th|T|W|M|F)/g));

      //console.log(dateArray);

      studentsData.forEach((student) => {
        dateArray.forEach((date) => {
          const attendanceRecord = attendanceData.find(
            (record) => formatDate(record.date) === date && record.student_id === student.id
          );
          attendance.push({
            student_id: student.id,
            date,
            is_present: attendanceRecord ? attendanceRecord.is_present : false,
          });
        });
      });
    }
    //console.log(attendance);

    res.status(200).json({
      students: studentsData,
      grades: gradesData,
      attendance: attendance,
      coursename: courseAndBatchNameData[0].coursename,
      batch: courseAndBatchNameData[0].batch,
    });

    dbconnection.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}