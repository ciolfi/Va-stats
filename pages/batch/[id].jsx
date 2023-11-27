/* When host is changed: Change values in
'API SECTIONS' below */

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Navbar from "../../components/Navbar";
import styles from "../../styles/Home.module.css";
import tableStyles from "../../styles/Table.module.css";
import Link from "next/link";
import Head from 'next/head';
import Table from "@/components/Table";
import TableCol from "@/components/TableCol";
import Image from 'next/image';

function staffHasAccess(batchInfo, userInfo) {
  var userName = "";
  if (userInfo["lastname"]) {
    userName = userInfo["firstname"] + " " + userInfo["lastname"];
  } else {
    userName = userInfo["firstname"];
  }
  let batchInstructorName = batchInfo["instructor"];
  let userAccessRole = userInfo["role"];
  let permitGranted = false;
  if (userAccessRole != "STAFF") {
    permitGranted = true;
  } else {
    if (userName === batchInstructorName) {
      permitGranted = true;
    }
  }
  return permitGranted;
}

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
  const [batchDocumentData, setBatchDocumentData] = useState({});
  const [selectedStudent, setSelectedStudent] = useState("");

  const [unassignedStudents, setUnassignedStudents] = useState([]);
  const [assignmentName, setAssignmentName] = useState("");

  const [showAttendance, setShowAttendance] = useState(true); /* Default active tab is Attendance */
  const [showGrades, setShowGrades] = useState(false);
  const [showManagement, setShowManagement] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);

  const [courseName, setCourseName] = useState("");
  const [batchName, setBatchName] = useState("");
  const [batchLength, setBatchLength] = useState("");

  const [attendanceColumn, setAttendanceColumn] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [documentsData, setDocumentsData] = useState([]);
  const [gradesColumn, setGradesColumn] = useState([]);
  const allowedRoles = ['ADMINISTRATOR','MANAGEMENT','STAFF'];
  const [selectedIDs, setSelectedIDs] = useState([]);

  const [contentLoading, setContentLoading] = useState(false);

  const deleteAssignment = async (assignmentName) => {
    if (assignmentName === "") {
      return;
    }

    const response = await fetch('/api/deleteassignment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ batchId: id, assignmentName }),
    });
    if (response.ok) {
      // I had to move getpagedata out of useeffect so i could call it here
      await getBatchData();
    } else {
      console.error('Error deleting the assignment');
    }
  };

  const batchPageLayoutHandler = (e) => {
    const { name, value } = e.target;
    setShowAttendance(false);
    setShowGrades(false);
    setShowManagement(false);
    setShowDocuments(false);
    switch(name) {
      case "attendance":
        setShowAttendance(true);
        break;
      case "grades":
        setShowGrades(true);
        break;
      case "management":
        setShowManagement(true);
        break;
      case "documents":
        setShowDocuments(true);
        break;
      default:
        setShowAttendance(true);
        break;
    }
  };

  const handleChange = (e) => {
    const checked = e.target.checked;
    const id = e.target.value;
    if (checked) {
      setSelectedIDs([...selectedIDs, id]);
    } else {
      setSelectedIDs(selectedIDs.filter((id) => id !== id));
    }
  };

  const optionChangeHandler = (e) => {
    const { name, value } = e.target;
    setSelectedStudent(value);
  };

  /* ---------------------------------- API SECTION -----------------------------------*/
  function getStudentRecordByName(data, name) {
    for(var i in data){
      if(data[i].name == name) {
        return data[i];
      }
    }
  }

  function getCourseNameById(data, id) {
    for(var i in data){
      if(data[i].id == id) {
        return data[i].coursename;
      }
    }
  }

  const fetchUnassignedStudents = async (batchId) => {
    setContentLoading(true);
    const studentApiResponse = await fetch(process.env.NEXT_PUBLIC_API_URL + `getstudentsdata`);
    const studentRes = await studentApiResponse.json();
    const batchesApiResponse = await fetch(process.env.NEXT_PUBLIC_API_URL + `getbatchesdata`);
    const batchesRes = await batchesApiResponse.json();
    // const apiUrlEndpoint = `https://va-stats.vercel.app/api/getunassignedstudents`;
    const apiUrlEndpoint = process.env.NEXT_PUBLIC_API_URL + `getunassignedstudents`;
    const postData = {
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        batch_id: batchId,
      }),
    };
    const response = await fetch(apiUrlEndpoint, postData);
    const data = await response.json();
    var studentList = [];
    data.students.forEach((student) => {
      const record = getStudentRecordByName(studentRes.students, student.name);
      const course = getCourseNameById(batchesRes.batches, batchId);
      if ([record.first_choice, record.second_choice, record.third_choice].includes(course)) {
        student = {
          ...student,
          first_choice: record.first_choice,
          second_choice: record.second_choice,
          third_choice: record.third_choice
        };
        studentList.push(student);
      }
    });
    setUnassignedStudents(studentList);
    setContentLoading(false);
  };

  /* ---------------------------------- API SECTION -----------------------------------*/
  const updateGrade = async (studentId) => {
    setContentLoading(true);
    // const apiUrlEndpoint = `https://va-stats.vercel.app/api/updategrade`;
    const apiUrlEndpoint = process.env.NEXT_PUBLIC_API_URL + `updategrade`;
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

  const updateGradeBatch = async (batch) => {
    batch.forEach((student) => {updateGrade(student);});
  };

  const updateDocumentsFee = async (studentId) => {
    setContentLoading(true);
    // const apiUrlEndpoint = `https://va-stats.vercel.app/api/updatedocumentsfee`;
    const apiUrlEndpoint = process.env.NEXT_PUBLIC_API_URL + `updatedocumentsfee`;
    const postData = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ batchId: id, studentId }),
    };
    const response = await fetch(apiUrlEndpoint, postData);
    if (response.ok) {
      console.log("Document and fees updated successfully");
      getBatchDocumentData();
    } else {
      console.error("Error updating documents and fees");
    }
    setContentLoading(false);
  };

  useEffect(() => {
    fetchUnassignedStudents(id);
  }, [id]);

  useEffect(() => {
    //console.log("Current unassigned students state: ", unassignedStudents);
  }, [unassignedStudents]);

  /* ---------------------------------- API SECTION -----------------------------------*/
  const addStudent = async (studentId) => {
    if(!studentId) return;
    setContentLoading(true);
    // const apiUrlEndpoint = 'https://va-stats.vercel.app/api/addstudenttobatch';
    const apiUrlEndpoint = process.env.NEXT_PUBLIC_API_URL + `addstudenttobatch`;
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

  const addStudentMulti = async (students) => {
    students.forEach((studentId) => {addStudent(studentId);});
  };

  /* ---------------------------------- API SECTION -----------------------------------*/
  const addAssignment = async (assignmentName, batchId) => {
    if (assignmentName === "") {
      return;
    }
    setContentLoading(true);
    // const apiUrlEndpoint = `https://va-stats.vercel.app/api/addassignment`;
    const apiUrlEndpoint = process.env.NEXT_PUBLIC_API_URL + `addassignment`;
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

  /* ---------------------------------- API SECTION -----------------------------------*/
  const getUserData = async () => {
    setContentLoading(true);
    // const apiUrlEndpoint = `https://va-stats.vercel.app/api/getuserdata`;
    const apiUrlEndpoint = process.env.NEXT_PUBLIC_API_URL + `getuserdata`;
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
      getBatchDocumentData();
    }
  }, [session]);
  // useEffect(() => {
  //   if (session) {
  //     getUserData();
  //     getBatchData();
  //   }
  // });

  /* ---------------------------------- API SECTION -----------------------------------*/
  const getBatchData = async () => {
    setContentLoading(true);
    // const apiUrlEndpoint = `https://va-stats.vercel.app/api/getbatchdetails`;
    const apiUrlEndpoint = process.env.NEXT_PUBLIC_API_URL + `getbatchdetails`;
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

  const getBatchDocumentData = async () => {
    setContentLoading(true);
    // const apiUrlEndpoint = `https://va-stats.vercel.app/api/getdocumentsfee`;
    const apiUrlEndpoint = process.env.NEXT_PUBLIC_API_URL + `getdocumentsfee`;
    const postData = {
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        batch_id: id,
      }),
    };
    const response = await fetch(apiUrlEndpoint, postData);
    const data = await response.json();
    setBatchDocumentData(data);

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
          availableValues: [1, 0, 2],
          isAttendance: true,
          isRotatedTh: true,
          isSortable: false,
          height: '70px',
        });
      });
    }
    res.unshift({ name: "% att.", accessor: "percent", immutable: true, isFirstColumn: true, isSticky: true, stickyWidth: 50, isRotatedTh:true, isSortable:false });
    res.unshift({ name: "Students", accessor: "name", immutable: true, isFirstColumn: true, isSticky: true, stickyWidth: 200, isRotatedTh:true, isSortable:true });
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
        res.push({ name: assignmentName, accessor: assignmentName, isRotatedTh: false });
      });
    }
    res.unshift({ name: "Students", accessor: "name", immutable: true, isFirstColumn: true, isSticky: true, width: '150px', isRotatedTh:true, isSortable:true });
    return res;
  };

  const generateStudentDocumentData = () => {
    let res = [];
    if (batchDocumentData?.documents) {
      res = batchDocumentData.documents.map((student) => {
        let studentDocuments = batchDocumentData.documents.filter((document) => document.id === student.id);
        let studentFees = batchDocumentData.fees.filter((fees) => fees.student_id === student.id);
        const studentData = {
          id: student.id,
          name: student.name,
        };

        studentData["id_proof"] = studentDocuments[0].id_proof;
        studentData["disability_cert"] = studentDocuments[0].disability_cert;
        studentData["photo"] = studentDocuments[0].photo;
        studentData["bank_details"] = studentDocuments[0].bank_details;

        studentFees.forEach((fee) => {
          studentData["fee_paid"] = fee.fee_paid;
          studentData["amount_1"] = fee.amount_1;
          studentData["amount_2"] = fee.amount_2;
          studentData["amount_3"] = fee.amount_3;
          studentData["nature_of_fee"] = fee.nature_of_fee;
        });
        return studentData;
      });
    }

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

  const updateAttendanceBatch = async (batch) => {
    batch.forEach((student) => {updateAttendance(student);});
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
    setDocumentsData(() => {
      return generateStudentDocumentData();
    });
  }, [batchData]);
  // useEffect(() => {
  //   setAttendanceColumn(() => {
  //     return generateColumnsFromDate();
  //   });
  //   setAttendanceData(() => {
  //     return generateStudentTableData();
  //   });
  //   setGradesColumn(() => {
  //     return generateColumnsFromAssignment();
  //   });
  // });

  if (loading) {
    return <p>Loading...</p>;
  }

  const docsColumns = [
    {
      name: 'Name',
      accessor: 'name',
    }, {
      name: 'ID Proof',
      accessor: 'id_proof',
      type: 'enum',
      availableValues: [0, 1],
      isBoolean: true,
    }, {
      name: 'Disability Certificate',
      accessor: 'disability_cert',
      type: 'enum',
      availableValues: [0, 1],
      isBoolean: true,
    }, {
      name: 'Photo',
      accessor: 'photo',
      type: 'enum',
      availableValues: [0, 1],
      isBoolean: true,
    }, {
      name: 'Bank Details',
      accessor: 'bank_details',
      type: 'enum',
      availableValues: [0, 1],
      isBoolean: true,
    }, {
      name: 'Fee Paid',
      accessor: 'fee_paid',
      type: 'enum',
      availableValues: ['NA', 'Paid', 'Not Paid', 'Waiver', 'Partial Waiver'],
    }, {
      name: 'Amount 1',
      accessor: 'amount_1',
    }, {
      name: 'Amount 2',
      accessor: 'amount_2',
    }, {
      name: 'Amount 3',
      accessor: 'amount_3',
    }, {
      name: 'Nature of Fee',
      accessor: 'nature_of_fee',
      type: 'enum',
      availableValues: ['NA', 'Refundable', 'Non-Refundable'],
    },
  ];

  if (status === 'unauthenticated' || userResponse.isactive === 0) {
    return (
      <div className='autherrorcontainer'>
        {/* <img src='logo-mainsite.png' alt='VisionAid logo' /> */}
        <Image src='logo-mainsite.png' alt='VisionAid logo' />
        <span className='autherrortext'>
          Access denied.&nbsp;
          <Link href='/' className='autherrorlink'>
            Please sign in with an active account.
          </Link>
        </span>
      </div>
    );
  } else {
    if (allowedRoles.includes(userResponse.role)) {
      if (staffHasAccess(batchData, userResponse)) {
      return (
        <>
          <div className={styles.mynavbar}>
            <Navbar user_role={userResponse.role} className={styles.navstudents} />
          </div>
          <div className={`${styles.container}`}>
            {contentLoading ?
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
                crossOrigin="true" />

              {/* <link rel='preload'
                as='style'
                href='https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;700&display=swap' />
              <link rel='stylesheet'
                href='https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;700&display=swap'
                media='print'
                onLoad="this.media='all'" />
              <noscript>
                <link rel='stylesheet'
                  href='https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;700&display=swap' />
              </noscript> */}
            </Head>
            {/* <p className={styles.title}>Course: {courseName}, Batch: {batchName}</p> */}
            <p className={styles.titlebatchspecific}>
              Course: {courseName}, Batch: {batchName}
            </p>
            {/* <p className={styles.subtitle}>Total students enrolled: {batchLength}</p> */}
            <p className={styles.batchTextTotalStudents}>Total students enrolled: {batchLength}</p>

            <div className={styles.batchContainer}>
              <div className={styles.buttons}>
                <button name="attendance" className={styles.addButton} onClick={(e) => batchPageLayoutHandler(e)} >
                  Batch Attendance
                </button>
                <button name="grades" className={styles.addButton} onClick={(e) => batchPageLayoutHandler(e)} >
                  Batch Grades
                </button>
                {(userResponse.role != 'STAFF') ?
                <button name="documents" className={styles.addButton} onClick={(e) => batchPageLayoutHandler(e)} >
                  Documents & Fees
                </button>
                :<></>}
                {(userResponse.role != 'STAFF') ?
                <button name="management" className={styles.addButton} onClick={(e) => batchPageLayoutHandler(e)} >
                  Batch Management
                </button>
                :<></>}
              </div>
            </div>

            {showManagement && (
              unassignedStudents.length != 0 ?
              (
              <div>
                {/* <div className={styles.batchManagementContainer}>
                  <h2>Assign Students to batch</h2>
                  <select className={styles.batchManagementList} onChange={(e) => optionChangeHandler(e)}>
                      <option></option>
                  {unassignedStudents.map((student) => {
                    return (
                      <option key={student.id} value={student.id} className={styles.unassignedItem}>
                        {student.name}
                      </option>
                    );
                  })}
                  </select>
                  <button className={styles.batchManagementButton} onClick={() => addStudent(selectedStudent)} >
                    Add to Batch
                  </button>
                </div> */}
                <div className={tableStyles.tableWrapper}>
                  <div className={styles.genericTableHeader}>
                    <h2>Assign Students to Batch</h2>
                  </div>
                  <table className={tableStyles.genericTable} cellPadding="0" cellSpacing="0">
                    <thead>
                      <tr>
                        <th>Select</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>First Choice</th>
                        <th>Second Choice</th>
                        <th>Third Choice</th>
                      </tr>
                    </thead>
                    <tbody>
                      {unassignedStudents.map((student) => {
                        return (
                          <tr key={student.id}>
                            <td>
                              <input
                                type='checkbox'
                                value={student.id}
                                onChange={handleChange}
                                checked={selectedIDs.includes(student.id.toString())}
                              />
                            </td>
                            <td> {student.id} </td>
                            <td> {student.name} </td>
                            <td> {student.first_choice} </td>
                            <td> {student.second_choice} </td>
                            <td> {student.third_choice} </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <button className={styles.batchManagementButton} onClick={() => addStudentMulti(selectedIDs)} >
                  Add Students to Batch
                </button>
              </div>
              )
              :
              <div>
                <h2>Assign Students to Batch</h2>
                <p><br></br>All prospective students are already added to the batch.</p>
              </div>
            )}

            {showAttendance && (attendanceColumn.length > 0 ?
              <TableCol columns={attendanceColumn} tableData={attendanceData} Title={'Attendance'} isEditable={true} onEditSave={updateAttendanceBatch} batchId={id} />
              : <></>
            )}

            {showGrades && (
              <div>
                <div className={styles.batchManagementContainer}>
                  <h2>Add New Assignment</h2>
                  <input
                    type="text"
                    id="assignmentName"
                    name="assignmentName"
                    className={styles.batchManagementList}
                    onChange={(e) => setAssignmentName(e.target.value)}
                  />
                  <button className={styles.batchManagementButton} onClick={() => addAssignment(assignmentName, id)}>Add Assignment</button>
                  <h2>Delete Assignment</h2>
                  <input
                    type="text"
                    id="assignmentName"
                    name="assignmentName"
                    className={styles.batchManagementList}
                    onChange={(e) => setAssignmentName(e.target.value)}
                  />
                  <button className={styles.batchManagementButton} onClick={() => deleteAssignment(assignmentName, id)}>Delete Assignment</button>
                </div>
              {gradesColumn.length > 0 ?
              <TableCol columns={gradesColumn} tableData={attendanceData} Title={'Grades'} isEditable={true} onEditSave={updateGradeBatch} batchId={id} />
              : <></>}
              </div>
            )}

            {showDocuments && (
              <Table columns={docsColumns} tableData={documentsData} isEditable={true} Title={'Student Documents and Fees'} onEditSave={updateDocumentsFee} />
            )}
          </div>

          {/* <footer className={styles.footer}>
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
          </footer> */}
          
        </>
      );
      } else {
        return (
          <>
            <div className={styles.mynavbar}>
              <Navbar user_role={userResponse.role} className={styles.navstudents} />
            </div>
            <div className={`${styles.container}`}>
              {contentLoading ?
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
                  crossOrigin="true" />

                {/* <link rel='preload'
                  as='style'
                  href='https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;700&display=swap' />
                <link rel='stylesheet'
                  href='https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;700&display=swap'
                  media='print'
                  onLoad="this.media='all'" />
                <noscript>
                  <link rel='stylesheet'
                    href='https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;700&display=swap' />
                </noscript> */}
              </Head>
              {/* <p className={styles.title}>Course: {courseName}, Batch: {batchName}</p> */}
              <p className={styles.titlebatchspecific}>
                Course: {courseName}, Batch: {batchName}
              </p>
              <div className='autherrorcontainer'>
                {/* <img src='logo-mainsite.png' alt='VisionAid logo' /> */}
                {/* <Image src='logo-mainsite.png' alt='VisionAid logo' /> */}
                <span className='autherrortext'>
                  Access denied.&nbsp;
                  <Link href='/batches' className='autherrorlink'>
                    User does not have access to this batch.
                  </Link>
                </span>
              </div>
            </div>

            {/* <footer className={styles.footer}>
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
            </footer> */}
          </>
        );
      }
    }
  }
}
