import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Navbar from "../../components/Navbar";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import Head from 'next/head';
import Table from "@/components/Table";
import Image from 'next/image';


function formatDate(isoDateString) {
  const date = new Date(isoDateString);
  return date.toLocaleDateString();
}

export default function Page() {
  const router = useRouter();
  const { id } = router.query;
  const { data: session, status } = useSession();

  const [loading, setLoading] = useState(true);
  const [userResponse, setUserResponse] = useState([]);
  const [batchData, setBatchData] = useState({});

  const [unassignedStudents, setUnassignedStudents] = useState([]);
  const [assignmentName, setAssignmentName] = useState("");

  const [addingStudent, setAddingStudent] = useState(false);
  const [addingAssignment, setAddingAssignment] = useState(false);

  const [courseName, setCourseName] = useState("");
  const [batchName, setBatchName] = useState("");
  const [batchLength, setBatchLength] = useState("");

  const [attendanceColumn, setAttendanceColumn] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [gradesColumn, setGradesColumn] = useState([]);

  const [contentLoading, setContentLoading] = useState(false);



  const deleteAssignment = async (assignmentName) => {

    const response = await fetch('/api/deleteassignment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ batchId: id, assignmentName }),
        });
        if (response.ok) {
            // i had to move getpagedata out of useeffect so i could call it here
            await getBatchData();
           
        } else {
            console.error('Error deleting the assignment');
        }
    };
  
  const fetchUnassignedStudents = async (batchId) => {
      setContentLoading(true);
      const apiUrlEndpoint = `https://visionaid-stats-ng.vercel.app/api/getunassignedstudents`;
      //const apiUrlEndpoint = `http://localhost:3000/api/getunassignedstudents`;

        
      const postData = {
        method: "Post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          batch_id: batchId,
        }),
      };
      const response = await fetch(apiUrlEndpoint, postData);
      const data = await response.json();
      setUnassignedStudents(data.students);
      setContentLoading(false);
    };

  const updateGrade = async (studentId) => {
    setContentLoading(true);
    const apiUrlEndpoint = `https://visionaid-stats-ng.vercel.app/api/updategrade`;
    //const apiUrlEndpoint = `http://localhost:3000/api/updategrade`;

    const postData = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ batchId: id, studentId }),
    };
    const response = await fetch(apiUrlEndpoint, postData);
    const result = await response.json();
    console.log('result', result.success);
    if (result.success) {
      console.log("its was a sucesss");
      getBatchData();
    } else {
      console.error("Error updating grade");
    }
    setContentLoading(false);
  };

  useEffect(() => {
    fetchUnassignedStudents(id);
  }, [id]);


    useEffect(() => {
      //console.log("Current unassigned students state: ", unassignedStudents);
    }, [unassignedStudents]);

  

    const addStudent = async (studentId) => {
      setContentLoading(true);
      const apiUrlEndpoint = `https://visionaid-stats-ng.vercel.app/api/addstudenttobatch`;
      //const apiUrlEndpoint = `http://localhost:3000/api/addstudenttobatch`;

      const postData = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, batchId: id }),
      };
      const response = await fetch(apiUrlEndpoint, postData);
      const result = await response.json();
      if (result.success) {
        fetchUnassignedStudents(id);
        getBatchData();
      } else {
        console.error("Error adding student to batch");
      }
      setContentLoading(false);
    };

    const addAssignment = async (assignmentName, batchId) => {
      setContentLoading(true);
      const apiUrlEndpoint = `https://visionaid-stats-ng.vercel.app/api/addassignment`;
      //const apiUrlEndpoint = `http://localhost:3000/api/addassignment`;

      const postData = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assignmentName, batchId }),
      };
      const response = await fetch(apiUrlEndpoint, postData);
      const result = await response.json();
      if (result.success) {
        getBatchData();
      } else {
        console.error("Error adding assignment");
      }
      setContentLoading(false);
    };


    const getUserData = async () => {
      setContentLoading(true);
      const apiUrlEndpoint = `https://visionaid-stats-ng.vercel.app/api/getuserdata`;
      //const apiUrlEndpoint = `http://localhost:3000/api/getuserdata`;

      const postData = {
        method: "Post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session.user.email,
        }),
      };
      const response = await fetch(apiUrlEndpoint, postData);
      const res = await response.json();
      // console.log(res)
      setUserResponse(res.users[0][0]);
      // console.log("User data: ", res.users[0]);

      setLoading(false);
      setContentLoading(false);
    };

    useEffect(() => {
      if (session) {
        getUserData();
        getBatchData();
      }
    }, [session]);



    const getBatchData = async () => {
      setContentLoading(true);
      const apiUrlEndpoint = `https://visionaid-stats-ng.vercel.app/api/getbatchdetails`;
      //const apiUrlEndpoint = "http://localhost:3000/api/getbatchdetails";

      const postData = {
        method: "Post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          batch_id: id,
        }),
      };
      const response = await fetch(apiUrlEndpoint, postData);
      const data = await response.json();        
      setBatchData(data);
      //console.log(data);


      setCourseName(data.coursename);
      setBatchName(data.batch);
      setBatchLength(data.students.length);
      //console.log("Batch data: ", data);

      setLoading(false);
      setContentLoading(false);
    };

    const generateColumnsFromDate = () => {
      let res = [];
      if (batchData?.attendance) {
        const attendanceDates = new Set();
        batchData.attendance.forEach((attendance) => {
          attendanceDates.add(attendance.date);
        });
        const attendanceDatesList = Array.from(attendanceDates).sort();
        attendanceDatesList.forEach((attendanceDate) => {
          res.push({
            name: attendanceDate.includes('T') ? attendanceDate.split('T')[0] : attendanceDate,
            accessor: attendanceDate,
            type: 'enum',
			      availableValues: [1, 0],
            isAttendance: true,
          });
        });
      }
      res.unshift({ name: "Students", accessor: "name", immutable: true });
      return res;
    };

    const generateStudentTableData = () => {
      let res = [];
      if (batchData?.students) {
        res = batchData.students.map((student) => {
          let studentGrade = batchData.grades.filter((grade) => grade.student_id === student.id);
          let studentAttendance = batchData.attendance.filter((att) => att.student_id === student.id);
          if (!studentGrade) {
            studentGrade = batchData.grades;
          }

          const studentData = {
            id: student.id,
            name: student.name,

          };
          //console.log('Student att : ', studentAttendance);


          studentAttendance.forEach((attendance) => {
             //console.log('Student data : ', studentData);
            studentData[attendance.date] = attendance.is_present;
          });
          studentGrade.forEach((grade) => {
            studentData[grade.assignment_name] = grade.grade;
          });
          return studentData;
        });
      }
      return res;
    };

    const generateColumnsFromAssignment = () => {
      let res = [];
      if (batchData?.grades) {
        const assignmentNames = new Set();
        batchData.grades.forEach((grade) => {
          assignmentNames.add(grade.assignment_name);
        });
        assignmentNames.forEach((assignmentName) => {
          res.push({ name: assignmentName, accessor: assignmentName });
        });
      }
      res.unshift({ name: "Students", accessor: "name", immutable: true });
      return res;
    };

    const updateAttendance = async (studentId) => {
      var batchId = id;
      //console.log(studentId);

      //console.log('batch id ', batchId);
      //console.log('studnet id ', studentId);

      try {
        const response = await fetch('/api/updateattendance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ batchId, studentId }),
        });

        if (!response.ok) {
          throw new Error('Failed to update attendance');
        }

      } catch (error) {
        console.error(error.message);
      }
    };

    useEffect(() => {
      setAttendanceColumn(() => {
        return generateColumnsFromDate();
      });
      setAttendanceData(() => {
        return generateStudentTableData();
      });
      setGradesColumn(() => {
        return generateColumnsFromAssignment();
      });
    }, [batchData]);

    if (loading) {
      return <p>Loading...</p>;
    }

    if (status === 'unauthenticated' || userResponse.isactive === 0) {
      return (
        <div className='autherrorcontainer'>
          <img src='logo-mainsite.png' alt='VisionAid logo' />
          <span className='autherrortext'>
            Access denied.&nbsp;
            <Link href='/' className='autherrorlink'>
              Please sign in with an active account.
            </Link>
          </span>
        </div>
      );
    } else {
        if (userResponse.role === "MANAGEMENT" || userResponse.role === "PM") {
          return (
          <>
            <div className={styles.mynavbar}>
              <Navbar user_role={userResponse.role} className={styles.navstudents} />
            </div>
              <div className={`${styles.container}`}>
              {contentLoading?
								<div className={styles.overlay}>
									<span className={styles.customLoader}></span>
								</div>
								: <></>
							}
              <Head>
                <title>VisionAid</title>
                <meta
                  name='description'
                  content='A nonprofit, advocating on behalf of persons with vision issues of any type' />
                <meta name='theme-color' content='#ffffff' />
                <link rel='icon' href='/favicon.ico' />
                <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
                <link rel='manifest' href='/manifest.json' />

                <link rel='preconnect'
                  href='https://fonts.gstatic.com'
                  crossOrigin />

                <link rel='preload'
                  as='style'
                  href='https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;700&display=swap' />

                <link rel='stylesheet'
                  href='https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;700&display=swap'
                  media='print'
                  onLoad="this.media='all'" />

                <noscript>
                  <link rel='stylesheet'
                    href='https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;700&display=swap' />
                </noscript>
              </Head>
              <p className={styles.title}>Course: {courseName}, Batch: {batchName}</p>
              <p className={styles.subtitle}>Total students enrolled: {batchLength}</p>


              <div className={styles.batchContainer}>
                <h1>Students</h1>

                <ul className={styles.studentList}>

                </ul>
                <div className={styles.buttons}>
                  <button
                    className={styles.addButton}
                    onClick={() => setAddingStudent(!addingStudent)}
                  >
                    Add Student
                  </button>
                  <button
                    className={styles.addButton}
                    onClick={() => setAddingAssignment(!addingAssignment)}
                  >
                    Add Assignment
                  </button>
                </div>
                {addingStudent && (
                  <div className={styles.unassignedContainer}>
                    <h2>Unassigned Students</h2>
                    <ul className={styles.unassignedList}>
                      {unassignedStudents.map((student) => {
                        return (
                          <li key={student.id} className={styles.unassignedItem}>
                            <button
                              className={styles.addUnassignedButton}
                              onClick={() => addStudent(student.id)}
                            >
                              Add {student.name} to Batch
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
                {addingAssignment && (
                  <div>
                    <label htmlFor="assignmentName">New Assignment:</label>
                    <input
                      type="text"
                      id="assignmentName"
                      name="assignmentName"
                      onChange={(e) => setAssignmentName(e.target.value)}
                    />
                    <button onClick={() => addAssignment(assignmentName, id)}>Add Assignment</button>
                  </div>
                )}
                </div>
              {attendanceColumn.length > 0 ?
                <Table columns={attendanceColumn} tableData={attendanceData} Title={'Attendance'} isEditable={true} onEditSave={updateAttendance} />
                : <></>
              }

              {gradesColumn.length > 0 ?
                <Table columns={gradesColumn} tableData={attendanceData} Title={'Grades'} isEditable={true} onEditSave={updateGrade} />
                : <></>
              }
              </div>
              <footer className={styles.footer}>
								<Link
									href='privacypolicy.html'
									target='_blank'
									rel='noopener noreferrer'
								>
									Privacy
								</Link>&nbsp;|&nbsp;
								<Link
									href='termsofservice.html'
									target='_blank'
									rel='noopener noreferrer'
								>
									Terms
								</Link>&nbsp;|&nbsp;
								<a
									href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
									target='_blank'
									rel='noopener noreferrer'
								>
									<span className={styles.logo}>
										Powered by{"' '"}
										<Image src='/vercel.svg'
											alt='Vercel Logo'
											width={72}
											height={16} />
									</span>
								</a>
							</footer>
        </>
      );
    }
  }
}