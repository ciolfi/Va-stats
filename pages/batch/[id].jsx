/* When host is changed: Change values in
'API SECTIONS' below */

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Navbar from "../../components/Navbar";
import styles from "../../styles/Home.module.css";
import tableStyles from "../../styles/Table.module.css";
import Link from "next/link";
import Head from 'next/head';
import Table from "@/components/Table";
import TableCol from "@/components/TableCol";
import TableStaff from "@/components/TableStaff";
import Image from 'next/image';
import Button from '@/components/Button';
import { searchTableData } from '@/utils/tableHelper';
import moment from 'moment-timezone';
const staffAdminEmails = ["statstrainer1@gmail.com", "vedant.m94@gmail.com"];

function getTodaysDate() {
  let currentDate = moment(new Date()).format("YYYY-MM-DD"); // IST Timezone conversion
  console.log("Todays date: "+currentDate);

  // var estDate = new Date("Thu Feb 01 2024 13:30:55 GMT-0500 (Eastern Standard Time)");
  // var istDate = new Date("Thu Feb 02 2024 00:00:55 GMT+0530 (Indian Standard Time)");
  // console.log(estDate);
  // console.log(istDate);
  // console.log(moment(estDate).format("YYYY-MM-DD"));
  // console.log(moment(istDate).format("YYYY-MM-DD"));

  return currentDate;
}

function staffHasAccess(batchInfo, userInfo) {
  var userName = "";
  if (userInfo["lastname"]) {
    userName = userInfo["firstname"] + " " + userInfo["lastname"];
  } else {
    userName = userInfo["firstname"];
  }
  let userEmail = userInfo["email"];
  let batchInstructorName = batchInfo["instructor"];
  let userAccessRole = userInfo["role"];
  let permitGranted = false;
  if (userAccessRole != "STAFF") {
    permitGranted = true;
  } else {
    // provides an override for select few email IDs as Master Staff level access
    if (userName === batchInstructorName || staffAdminEmails.includes(userEmail)) {
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
  const [toggleUnassignedStudents, setToggleUnassignedStudents] = useState(true);
  const origUnassignedStudents = useRef([]);

  const [showAttendance, setShowAttendance] = useState(true); /* Default active tab is Attendance */
  const [showGrades, setShowGrades] = useState(false);
  const [showManagement, setShowManagement] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);
  const [showAssessments, setShowAssessments] = useState(false);
  const [currentPanel, setCurrentPanel] = useState(0);

  const [courseName, setCourseName] = useState("");
  const [batchName, setBatchName] = useState("");
  const [batchLength, setBatchLength] = useState("");
  const [batchTotalCost, setBatchTotalAmount] = useState("");
  const [batchAmount1, setBatchAmount1] = useState("");
  const [batchAmount2, setBatchAmount2] = useState("");
  const [batchAmount3, setBatchAmount3] = useState("");
  const [batchCurrency, setBatchCurrency] = useState("");

  const [attendanceColumn, setAttendanceColumn] = useState([]);
  const [attendanceColumnStaff, setAttendanceColumnStaff] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [documentsData, setDocumentsData] = useState([]);
  const [assessmentsData, setAssessmentsData] = useState([]);
  const [gradesColumn, setGradesColumn] = useState([]);
  const [assessmentsOptions, setAssessmentsOptions] = useState([]);
  const allowedRoles = ['ADMINISTRATOR','MANAGEMENT','STAFF'];
  const [addSelectedIDs, setAddSelectedIDs] = useState([]);
  const [deleteSelectedIDs, setDeleteSelectedIDs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editBatch, setEditBatch] = useState(false);

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

  const handleSubmit = () => {
    setContentLoading(true);
  };

  const handleMultiStudentDelete = () => {
    setEditBatch(true);
  };

  const batchPageLayoutHandler = (e) => {
    const { name, value } = e.target;

    // Logic to prompt user if there are any unsaved changes i.e they are in the edit mode

    const editMode = localStorage.getItem('editMode')
    
    // Check if the user is clicking on the same tab he already is in
    const isSameComponent = name === "assessments" && showAssessments ||
                        name === "attendance" && showAttendance ||
                        name === "documents" && showDocuments ||
                        name === "grades" && showGrades ||
                        name === "management" && showManagement;
    // If edit mode is on and user tries to go to a different component show the prompt
    if(editMode === 'true' && !isSameComponent){
      if (confirm("You have unsaved changes, click on OK to go back and save them. If you click cancel the changes will be lost.") == true) {
        return
      }else{
        localStorage.setItem('editMode', 'false')
      } 
    }


    setShowAttendance(false);
    setShowGrades(false);
    setShowManagement(false);
    setShowDocuments(false);
    setShowAssessments(false);
    switch(name) {
      case "attendance":
        setShowAttendance(true);
        setCurrentPanel(0);
        break;
      case "grades":
        setShowGrades(true);
        setCurrentPanel(1);
        break;
      case "management":
        setShowManagement(true);
        setCurrentPanel(2);
        break;
      case "documents":
        setShowDocuments(true);
        setCurrentPanel(3);
        break;
      case "assessments":
        setShowAssessments(true);
        setCurrentPanel(4);
        break;
      default:
        setShowAttendance(true);
        setCurrentPanel(0);
        break;
    }
  };

  const handleChangeAdd = (e) => {
    const checked = e.target.checked;
    const id = e.target.value;
    if (checked) {
      setAddSelectedIDs([...addSelectedIDs, id]);
    } else {
      setAddSelectedIDs(addSelectedIDs.filter((id) => id !== id));
    }
  };

  const handleChangeDelete = (e) => {
    const checked = e.target.checked;
    const id = e.target.value;
    if (checked) {
      setDeleteSelectedIDs([...deleteSelectedIDs, id]);
    } else {
      setDeleteSelectedIDs(deleteSelectedIDs.filter((id) => id !== id));
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
      if (!toggleUnassignedStudents || [record.first_choice, record.second_choice, record.third_choice].includes(course)) {
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
    origUnassignedStudents.current = studentList;
    setContentLoading(false);
  };

  const handleToggleUnassignedStudents = () => {
    setToggleUnassignedStudents(!toggleUnassignedStudents);
    // fetchUnassignedStudents(id);
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
  }, [id, toggleUnassignedStudents]);

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
    setAddSelectedIDs([]);
    setDeleteSelectedIDs([]);
  };

  const deleteStudent = async (studentId) => {
    if(!studentId) return;
    setContentLoading(true);
    // const apiUrlEndpoint = 'https://va-stats.vercel.app/api/addstudenttobatch';
    const apiUrlEndpoint = process.env.NEXT_PUBLIC_API_URL + `deletestudentfrombatch`;
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

  const deleteStudentMulti = async (students) => {
    students.forEach((studentId) => {deleteStudent(studentId);});
    setAddSelectedIDs([]);
    setDeleteSelectedIDs([]);
    setEditBatch(false);
  };

  /* ---------------------------------- API SECTION -----------------------------------*/
  const addAssignment = async (batch_id) => {
    if (!document.querySelector('form').reportValidity()){
      return;
    }
    const currentAssessments = assessmentsData.map((assessment) => assessment.id);
    const assignment_name = document.getElementById('assignment_name').value;
    const assignment_type = document.getElementById('formative').checked ? "Formative" : "Post";
    const assignment_weight = document.getElementById('assignment_weight').value;
    if (currentAssessments.includes(assignment_name)) {
      alert("Assessment already exists, please use a different name");
      return;
    }
    setContentLoading(true);
    // const apiUrlEndpoint = `https://va-stats.vercel.app/api/addassignment`;
    const apiUrlEndpoint = process.env.NEXT_PUBLIC_API_URL + `addassignment`;
    const postData = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ assignment_name, assignment_type, assignment_weight, batch_id }),
    };
    const response = await fetch(apiUrlEndpoint, postData);
    // const result = await response.json();
    if (response.status === 200) {
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

 // => Below code leads to flipping edit state to initial state on tab change as session gets changed and data gets refreshed
  // useEffect(() => {
  //   if (session) {
  //     getUserData();
  //     getBatchData();
  //     getBatchDocumentData();
  //   }
  // }, [session, currentPanel]);

  // Added initial call to the batches API
  useEffect(() => {
    if (session) {
      getUserData();
      getBatchData();
      getBatchDocumentData();
    }
  }, []);
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
    setBatchTotalAmount(documentsData["total_amount"]);
    setBatchAmount1(documentsData["total_amount_1"]);
    setBatchAmount2(documentsData["total_amount_2"]);
    setBatchAmount3(documentsData["total_amount_3"]);
    setBatchCurrency(data.currency);
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
          availableValues: [1, 0, 2, 3],
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

  const generateColumnsFromDateStaff = () => {
    let res = [];
    if (batchData?.attendance) {
      const attendanceDates = new Set();
      const todaysDate = moment(new Date()).format("YYYY-MM-DD");
      console.log("Todays date: " + todaysDate);
      batchData.attendance.forEach((attendance) => {
        attendanceDates.add(attendance.date);
      });
      const attendanceDatesList = Array.from(attendanceDates).sort();
      if (attendanceDatesList.includes(todaysDate)) {
        res.push({
          name: todaysDate,
          accessor: todaysDate,
          type: 'enum',
          availableValues: [1, 0, 2, 3],
          isAttendance: true,
          isRotatedTh: true,
          isSortable: false,
          height: '70px',
        });
      }
    }
    res.unshift({ name: "Students", accessor: "name", immutable: false, isFirstColumn: true, isSticky: true, stickyWidth: 200, isRotatedTh:true, isSortable:false });
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
    let options = [];
    if (batchData?.grades) {
      const assignmentNames = new Set();
      batchData.grades.forEach((grade) => {
        assignmentNames.add(grade.assignment_name);
      });
      assignmentNames.forEach((assignmentName) => {
        res.push({ name: assignmentName, accessor: assignmentName, isRotatedTh: false });
        options.push(<option value={assignmentName}>{assignmentName}</option>);
      });
      setAssessmentsOptions(options);
    }
    res.unshift({ name: "Students", accessor: "name", immutable: true, isFirstColumn: true, isSticky: true, width: '150px', isRotatedTh:true, isSortable:true });
    return res;
  };

  const generateBatchAssessmentsData = () => {
    let res = [];
    if (batchData?.students) {
        let studentGrade = batchData.grades.filter((grade) => grade.student_id === batchData.students[0].id);
        if (!studentGrade) {
          studentGrade = batchData.grades;
        }

        studentGrade.forEach((grade) => {
          const assessmentData = {};
          assessmentData["id"] = grade.assignment_name;
          assessmentData["assignment_name"] = grade.assignment_name;
          assessmentData["assignment_type"] = grade.assignment_type;
          assessmentData["assignment_weight"] = grade.assignment_weight;
          res.push(assessmentData);
        });
    }
    return res;
  };

  const generateStudentDocumentData = () => {
    let res = [];
    let totalAmount = 0, amount1 = 0, amount2 = 0, amount3 = 0;
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
          totalAmount += fee.amount_1;
          amount1 += fee.amount_1;
          studentData["amount_2"] = fee.amount_2;
          totalAmount += fee.amount_2;
          amount2 += fee.amount_2;
          studentData["amount_3"] = fee.amount_3;
          totalAmount += fee.amount_3;
          amount3 += fee.amount_3;
          studentData["nature_of_fee"] = fee.nature_of_fee;
        });
        return studentData;
      });
    }

    res["total_amount"] = totalAmount;
    res["total_amount_1"] = amount1;
    res["total_amount_2"] = amount2;
    res["total_amount_3"] = amount3;

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

  function exportToCsv(filename, rows) {
    var processRow = function (row) {
        var finalVal = '';
        for (var j = 0; j < row.length; j++) {
            var innerValue = row[j] === null ? '' : row[j].toString();
            if (row[j] instanceof Date) {
                innerValue = row[j].toLocaleString();
            };
            var result = innerValue.replace(/"/g, '""');
            if (result.search(/("|,|\n)/g) >= 0)
                result = '"' + result + '"';
            if (j > 0)
                finalVal += ',';
            finalVal += result;
        }
        return finalVal + '\n';
    };

    var csvFile = '';
    for (var i = 0; i < rows.length; i++) {
        csvFile += processRow(rows[i]);
    }

    var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, filename);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
  }

  const batchCompletionReportHandler = () => {
    let rows = [];
    attendanceData.forEach((student) => {
      let studentRow = [];
      studentRow.push(student.name);
      let totalAttendance = 0;
      let totalClasses = 0;
      attendanceColumn.forEach((column) => {
        if (column.accessor !== 'name' && column.accessor !== 'percent') {
          if (student[column.accessor] === 1) {
            totalAttendance++;
          }
          if (student[column.accessor] !== 3) {
            totalClasses++;
          }
        }
      });
      studentRow.push(totalAttendance);
      studentRow.push(totalClasses);
      studentRow.push((totalAttendance / totalClasses) * 100);
      rows.push(studentRow);
    });
    exportToCsv('batch_completion_report.csv', studentRow);
  }

  useEffect(() => {
    setAttendanceColumn(() => {
      return generateColumnsFromDate();
    });
    setAttendanceColumnStaff(() => {
      return generateColumnsFromDateStaff();
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
    setAssessmentsData(() => {
      return generateBatchAssessmentsData();
    });
  }, [batchData, currentPanel, batchDocumentData]);
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

  const assessmentsColumns = [
    {
      name: 'Name',
      accessor: 'assignment_name',
    }, {
      name: 'Type',
      accessor: 'assignment_type',
      type: 'enum',
      availableValues: ['Formative', 'Post'],
    }, {
      name: '% Weight',
      accessor: 'assignment_weight',
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
              <title>Batch {batchName} - Vision-Aid-STATS</title>
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
                <button name="grades" className={styles.addButton} onClick={(e) => batchCompletionReportHandler()} >
                  Batch Completion report
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
                {(userResponse.role != 'STAFF') ?
                <button name="assessments" className={styles.addButton} onClick={(e) => batchPageLayoutHandler(e)} >
                  Assessment Management
                </button>
                :<></>}
              </div>
            </div>

            {showManagement && (
              <div>
                <div className={tableStyles.tableRow}>
                  <div className={tableStyles.tableColumn}>
                    <div className={tableStyles.genericTableHeader}>
                      <h2>Assign Students to Batch</h2>
                      <input
                        id="table-search"
                        className={tableStyles.tableSearch}
                        onInput={(e) => searchTableData(setUnassignedStudents, e.target.value, origUnassignedStudents.current)}
                        onKeyUp={(e) => {
                          if (e.key == 'Enter') {
                            document.getElementById("table-search").value = '';
                            document.getElementById("table-search").blur();
                            window.focus();
                          }
                        }}
                        placeholder={`Search in Student list`}
                        autoFocus={true}
                      ></input>&nbsp;
                      <button title={'Toggle unassigned student list'} className={styles.batchManagementButton} onClick={() => {handleToggleUnassignedStudents();}} >
                        {toggleUnassignedStudents?"Show all students":"Show interested students"}
                      </button>
                    </div>
                    <table className={tableStyles.genericTable} cellPadding="0" cellSpacing="0" height="400px">
                      <thead>
                        <tr>
                          <th>Select</th>
                          <th width="50px">ID</th>
                          <th width="235px">Name</th>
                          <th>First Choice</th>
                          <th>Second Choice</th>
                          <th>Third Choice</th>
                        </tr>
                      </thead>
                      <tbody>
                      {unassignedStudents.length != 0 ?
                        unassignedStudents.map((student) => {
                          return (
                            <tr key={student.id}>
                              <td>
                                <input
                                  type='checkbox'
                                  value={student.id}
                                  onChange={handleChangeAdd}
                                  checked={addSelectedIDs.includes(student.id.toString())}
                                />
                              </td>
                              <td> {student.id} </td>
                              <td> {student.name} </td>
                              <td> {student.first_choice} </td>
                              <td> {student.second_choice} </td>
                              <td> {student.third_choice} </td>
                            </tr>
                          );
                        })
                        :
                        <td colSpan="6" style={{ textAlign: "center" }}>All prospective students are already added to the batch.</td>
                      }
                      </tbody>
                    </table>
                  </div>
                  <div className={tableStyles.tableColumn}>
                    <div className={tableStyles.buttonContainer}>
                      <div className={tableStyles.buttonCenter}>
                        <button title={'Add students to Batch'} className={styles.batchManagementButton} onClick={() => {addStudentMulti(addSelectedIDs);}} >
                          Add&nbsp;&gt;&gt;
                        </button>
                        {editBatch ?
                          <button title={'Remove students from Batch'} className={styles.batchManagementDeleteButton} onClick={() => {deleteStudentMulti(deleteSelectedIDs);}} >
                            &lt;&lt;&nbsp;Del&nbsp;
                          </button>
                        :
                        <button title={'Select students to remove from Batch'} className={styles.batchManagementDeleteButton} onClick={() => {handleMultiStudentDelete();}} >
                          &lt;&lt;&nbsp;Del&nbsp;
                        </button>
                        }
                      </div>
                    </div>
                  </div>
                  <div className={tableStyles.tableColumn}>
                    <div className={tableStyles.genericTableHeader}>
                      <h2>Current Batch</h2>
                    </div>
                    <table className={tableStyles.genericTable} cellPadding="0" cellSpacing="0" height="400px">
                      <thead>
                        <tr>
                          {editBatch ? <th>Select</th> : <></>}
                          <th width="50px">ID</th>
                          <th width="235px">Name</th>
                        </tr>
                      </thead>
                      <tbody>
                      {batchData.students.length != 0 ?
                        batchData.students.map((student) => {
                          return (
                            <tr key={student.id}>
                              {editBatch ?
                              <td>
                                <input
                                  type='checkbox'
                                  value={student.id}
                                  onChange={handleChangeDelete}
                                  checked={deleteSelectedIDs.includes(student.id.toString())}
                                />
                              </td>
                              : <></>}
                              <td> {student.id} </td>
                              <td> {student.name} </td>
                            </tr>
                          );
                        })
                        :
                        <td colSpan="6" style={{ textAlign: "center" }}>This batch currently does not have any students.</td>
                      }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {showAttendance && (attendanceColumn.length > 0 ?
              (userResponse.role == "STAFF" ?
                <TableStaff columns={attendanceColumnStaff} tableData={attendanceData} Title={'Attendance'} isEditable={false} onEditSave={updateAttendanceBatch} batchId={id} />
                : <TableCol columns={attendanceColumn} tableData={attendanceData} Title={'Attendance'} isEditable={true} onEditSave={updateAttendanceBatch} batchId={id} isAccessible={false} />
              )
              : <></>
            )}

            {showGrades && (
              <div className={styles.gridcourses}>
              {gradesColumn.length > 0 ?
              <TableCol columns={gradesColumn} tableData={attendanceData} Title={'Grades'} isEditable={true} onEditSave={updateGradeBatch} batchId={id} isAccessible={userResponse.role == "STAFF"} />
              : <></>}
              </div>
            )}

            {showAssessments && (
              <div>
                {showForm ?
                  <div className={styles.cardcoursesform}>
                  <h2>Create Assessment &rarr;</h2>
                  <Image alt={'close batches form'} src={'/icons/expand-up.svg'} height={30} width={30} onClick={() => setShowForm(false)} className={styles.collapseButtonAssessment} title="Close Course Form" />
                  <form action='/api/addassignment' method='post' onSubmit={() => handleSubmit()}>
                    <ul className={styles.batchManagementForm}>
                      <li>
                        <label htmlFor='assignment_name'>Assessment Name:<span className={styles.requiredelement}>&#42;</span></label>
                        <input type='text' id='assignment_name' name='assignment_name' required /><br /><br />
                      </li>
                      <li>
                        <label htmlFor='assignment_type'>Assessment Type:<span className={styles.requiredelement}>&#42;</span></label>
                        <input type="radio" id="formative" name="assignment_type" value="Formative" defaultChecked/>&nbsp;
                        <label for="formative">Formative</label>&nbsp;&nbsp;
                        <input type="radio" id="post" name="assignment_type" value="Post" />&nbsp;
                        <label for="post">Post</label><br /><br />
                      </li>
                      <li>
                        <label htmlFor='assignment_weight'>Assessment Weight:<span className={styles.requiredelement}>&#42;</span></label>
                        <input type='number' id='assignment_weight' name='assignment_weight' min={0} max={100} placeholder="0-100" required/><br />
                        {/* The following hidden parameter was added to pass along the batch ID along with the submitted form data */}
                        <input type="hidden" name="batch_id" value={id}></input>
                        <button type='button' className={styles.batchManagementButton} onClick={() => addAssignment(id)}>Submit</button>&nbsp;&nbsp;
                        {/* <button type='submit' className={styles.batchManagementButton}>Submit</button>&nbsp;&nbsp; */}
                        <input type='reset' className={styles.batchManagementButton} value='Reset'></input>
                      </li>
                    </ul>
                  </form>
                  </div>
                : <Button onClick={() => setShowForm(true)} text={'+ New Assessment Form'}></Button>
                }
                <Table columns={assessmentsColumns} tableData={assessmentsData} isDelete={true} onDeleteClick={deleteAssignment} isEditable={true} Title={'Assessments'} onEditSave={updateDocumentsFee} />
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
