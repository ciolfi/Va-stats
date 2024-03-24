"use client";
// NOTE: IF FORM FIELDS ARE EDITED, YOU MUST ALSO EDIT:
// /pages/students.jsx (1 sec.), 
// /pages/api/studentapplication.js (2 secs.), 
// /pages/api/getstudentsdata.js (1 sec.)
// DreamHost CSV files: csvfunctions.php (3 secs.), students.php (1 sec.)

// Education inputs (dropdown, textbox)
// import { NextUIProvider, Select, SelectItem } from "@nextui-org/react";
import { edcredentials } from "../components/data";

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import React from "react";
import Router from "next/router";   // Popup confirmation
import styles from "../styles/StudentReg.module.css";
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useRef } from 'react';
import { useSession } from 'next-auth/react';

// MUI Datepicker
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

let worldData = require("../utils/countries+states.json");
var userRole = "STAFF";

export default function Page() {
  useForm(); // Form reset
  const { data: session, status } = useSession();
  var result;

  // BIRTHDATE MUI
  // const [date, setDate] = useState(new Date());
  // const millis = date;
  // const convdate = new Date(millis);
  // console.log("Convdate: " + (convdate.getMonth() + 1) + "/" + convdate.getDate() + "/" + convdate.getFullYear());

  // API DATA ACCESS
  const getUserData = async () => {
    const apiUrlEndpoint = process.env.NEXT_PUBLIC_API_URL + `getuserdata`;
    const postData = {
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({              /* LOCAL TESTING */
        email: session.user.email
      }),
    };
    const response = await fetch(apiUrlEndpoint, postData);
    const res = await response.json();
    result = res.users[0];                /* LOCAL TESTING */

    if (status == "authenticated") {
      userRole = result[0].role;
    }
  };

  useEffect(() => {
    getUserData();
  }, [session]);

  // Line below may work FOR SSRPROVIDER ERRORS:
  // const { isBrowser } = useSSR();

  const [contentLoading, setContentLoading] = useState(false);
  // const [contentLoading, setContentLoading] = useState(true);
  const [courseResponse, setCourseResponse] = useState(() => []);
  const [courseOptions1, setCourseOptions1] = useState(() => []);
  const [courseOptions2, setCourseOptions2] = useState(() => []);
  const [courseOptions3, setCourseOptions3] = useState(() => []);

  const [countriesOptions, setCountriesOptions] = useState(() => []);
  const [stateOptions, setStateOptions] = useState(() => []);

  const [Option1, setOption1] = useState(() => []);
  const [Option2, setOption2] = useState(() => []);

  /*-------- COURSE CHOICE SUMMARIES CODE BEGINS ------*/
  /*-------- NOTE: This is interim code until
  data-driven components are implemented ------*/

  const pythonSummary = "The Python class goal is to develop skills to write simple applications using Python programming language. We recommend familiarity with other programming languages. The course will be 4-6 months long.";
  const cSummary = "The C language is a fundamental language in the field of computer science. It's powerful and has a wide variety of uses. It has been used to create databases, applications, and even operating systems. The C language is considered both fast and versatile.";
  const cplusplusSummary = "The C++ language is very popular. It gives programmers a great deal of control over system memory and other resources. It facilitates the creation of high-performance applications. C++ has played a key role in the development of a wide variety of software, including video games.";
  const ccaSummary = "This is our Certificate Course in Computer Applications (CCA). It is a preparatory course to introduce students to computers and computer applications. The student will acquire a basic understanding of computers and practical knowledge of using computer applications and voice assisted software. The student should be 15+ years of age with access to a computer.";
  const phpSummary = "The PHP language is widely used in Information Technology. It is a server side scripting language. PHP can be used to create interactive and dynamic websites. It is especially helpful in connecting databases to websites. Although it's considered beginner-friendly, it is extremely powerful.";
  const htmlSummary = "HTML is our broad course on critical website languages. The student will acquire skills in HTML, CSS, JavaScript, and ARIA Fundamentals for accessible Web development. The ideal student has a Bachelor degree, skill with computers and touch screen phones, and proficiency using MS Office and screen readers like NVDA and JAWS. The course is 2 months long with 90 minutes per class.";
  const mobtechSummary = "The Mobile Technology course will enable a person with visual impairment to effectively use the modern-day smartphone for day-to-day work, mobility and comfort. Additionally, the student will learn essential nomenclature related to hardware and software. The ideal student is 12+ years of age and has an Android mobile device.";
  const cssSummary = "The CSS course is for people who want to develop the skills to style websites. Since CSS works with HTML in creating websites, this is a great follow up course for those who took our HTML course. Website creation focuses on separating content (HTML) and design (CSS). The student will acquire a deep understanding of the manipulation of color, fonts, and a variety of other web page characteristics.";
  const excelSummary = "Excel is Microsoft's universally popular spreadsheet software. It is used for a variety of purposes including: record-keeping, business analytics, as a 'database' when higher-level database functinality is not required.";
  const datSummary = "Digital Accessibility Testing";
  const sepbSummary = "Spoken English Programme Beginner";
  const chatGptSummary = "AI tools and prompt Engineering";

  /*-------- COURSE CHOICE SUMMARIES ITEM ----------*/
  const [Option3, setOption3] = useState(() => []);

  const [choiceChanged, setChoiceChanged] = useState(false);

  const refFirstChoice = useRef(null);
  const refSource = useRef(null);

  const textAreaHandleEnter = (e) => {
    const { name, value } = e.target;
    if (e.keyCode == 13 && !e.shiftKey) {
      e.preventDefault();
      if (name == 'objectives') {
        refFirstChoice.current.focus();
      } else if (name == 'impairment_history') {
        refSource.current.focus();
      }
    }
  };

  const getSummaries = (e) => {
    // See constants section above for returned values
    if (e == "Python") {
      return pythonSummary;
    }
    else if (e == "C") {
      return cSummary;
    }
    else if (e == "C++") {
      return cplusplusSummary;
    }
    else if (e == "CCA") {
      return ccaSummary;
    }
    else if (e == "PHP") {
      return phpSummary;
    }
    else if (e == "HTML") {
      return htmlSummary;
    }
    else if (e == "Mobile Technology") {
      return mobtechSummary;
    }
    else if (e == "CSS") {
      return cssSummary;
    }
    else if (e == "Excel") {
      return excelSummary;
    }
    else if (e == "DAT") {
      return datSummary;
    }
    else if (e == "SEP B") {
      return sepbSummary;
    }
    else if (e == "Chatgpt") {
      return chatGptSummary;
    }
    else {
      return "AN UNKNOWN course was chosen ...";
    }
  };

  const updateChoices = (e) => {
    const { name, value } = e.target;
    if (name === 'first_choice') {
      setOption1(value);

      /*----------- COURSE CHOICE SUMMARIES ITEM ----------*/
      alert("First choice summary: " + getSummaries(value));

    } else if (name === 'second_choice') {
      setOption2(value);

      /*----------- COURSE CHOICE SUMMARIES ITEM ----------*/
      alert("Second choice summary: " + getSummaries(value));

    }

    else if (name === 'third_choice') {
      setOption3(value);

      /*----------- COURSE CHOICE SUMMARIES ITEM ----------*/
      alert("Third choice summary: " + getSummaries(value));

    }

    setChoiceChanged(!choiceChanged);
  };
  /*------------ COURSE CHOICE SUMMARIES CODE ENDS ----------*/

  /* INPUT CONSTRAINT: Course choices dropdowns; selection is enforced by
  the onfocus event in the next form element (Visual Acuity dropdown) */
  const checkDropdown = (e) => {
    if ((document.getElementById('first_choice').value !== 'Select First Choice')) {
      return;
    }
    else if (document.getElementById('first_choice').value == 'Select First Choice') {
      document.getElementById('first_choice').focus();
    }
  };
  const checkSecondCourseChoice = (e) => {
    if ((document.getElementById('second_choice').value !== 'Select Second Choice')) {
      return;
    }
    else if (document.getElementById('second_choice').value == 'Select Second Choice') {
      document.getElementById('second_choice').value = '';
      return;
    }
  };
  const checkThirdCourseChoice = (e) => {
    if ((document.getElementById('third_choice').value !== 'Select Third Choice')) {
      return;
    }
    else if (document.getElementById('third_choice').value == 'Select Third Choice') {
      document.getElementById('third_choice').value = '';
      return;
    }
  };

  const updateOptions = () => {
    const options2 = [];
    courseResponse.map(course => {
      if (course.course != Option1) {
        options2.push(<option value={course.course}>{course.course}</option>);
      }
    });
    setCourseOptions2(options2);

    const options3 = [];
    courseResponse.map(course => {
      if (course.course != Option1 && course.course != Option2) {
        options3.push(<option value={course.course}>{course.course}</option>);
      }
    });
    setCourseOptions3(options3);
  };

  const getCourseData = async () => {
    setContentLoading(true);
    const apiUrlEndpoint = `api/getcoursesdata`;
    const response = await fetch(apiUrlEndpoint);
    const res = await response.json();
    setCourseResponse(res.courses);
    setContentLoading(false);
  };

  const getCourseOptions = () => {
    const options = [];
    courseResponse.map(course => {
      options.push(<option value={course.course}>{course.course}</option>);
    });
    setCourseOptions1(options);
    updateOptions();
  };

  useEffect(() => {
    getCourseOptions();
  }, [courseResponse, choiceChanged]);

  useEffect(() => {
    getCourseData();
  }, []);

  const updateCountriesOptions = () => {
    const countries = [];
    var countryinput = document.getElementById('country');
    worldData.map(country => {
      countries.push(<option value={country.name}>{country.name}</option>);
    });
    setCountriesOptions(countries);
    countryinput.value = 'India';
  }

  const updateStateOptions = (e) => {
    const { name, value } = e.target;
    const statesList = [];
    const statesRaw = worldData.find(country => country.name === value).states;
    statesRaw.map(state => {
      statesList.push(<option value={state.name}>{state.name}</option>);
    });
    setStateOptions(statesList);
  };

  useEffect(() => {
    updateCountriesOptions();
  }, []);



  /*-------------------- GENDER DROPDOWN -------------------*/
  // GENDER
  const [selectedGender, setSelectedGender] = React.useState(new Set(["Female"]));
  const selectedValueGender = React.useMemo(
    () => Array.from(selectedGender).join(", ").replaceAll("_", " "),
    [selectedGender]
  );

  // DISABILITY DROPDOWN
  const [selectedDisability, setSelectedDisability] = useState('');
  console.log("Disability: " + selectedDisability);
  if ((selectedDisability == 'Other disability') || (selectedDisability == 'Non-disabled')) {
    alert('Sorry, you are not eligible to apply.');
  }

  // EDUCATION DROPDOWN
  const [selectedEdu, setSelectedEdu] = useState('Below 10th standard');

  // EMPLOYMENT STATUS
  const [selectedEmpStatus, setSelectedEmpStatus] = React.useState(new Set(["Employed"]));
  const selectedValueEmpStatus = React.useMemo(
    () => Array.from(selectedEmpStatus).join(", ").replaceAll("_", " "),
    [selectedEmpStatus]
  );

  // VISION
  const [selectedVision, setSelectedVision] = React.useState(new Set(["LowVision"]));
  const selectedValueVision = React.useMemo(
    () => Array.from(selectedVision).join(", ").replaceAll("_", " "),
    [selectedVision]
  );

  // VISION LOSS
  // const checkVisionLoss = () => {
  //   var chosenpercentloss = parseInt((document.getElementById("percent_loss").value));
  //   if ((chosenpercentloss > 0 ) || (chosenpercentloss < 100)) {
  //     alert("Within range!");
  //   }
  //   else{
  //     alert("NOT IN RANGE!");
  //   }
  // }

  // ADD COURSE CHOICE 
  function addCourseChoice(coursepriority) {
    var chosencourse = document.getElementsByName('vacourse');
    for (let i = 0; i < chosencourse.length; i++) {
      if (chosencourse[i].checked) {
        if (coursepriority == "firstchoice") {
          var selecttextbox = document.getElementById("textboxfirstchoice");
          selecttextbox.value = chosencourse[i].value;
        }
        else if (coursepriority == "secondchoice") {
          var selecttextbox = document.getElementById("textboxsecondchoice");
          selecttextbox.value = chosencourse[i].value;
        }
        else if (coursepriority == "thirdchoice") {
          var selecttextbox = document.getElementById("textboxthirdchoice");
          selecttextbox.value = chosencourse[i].value;
        }
      }
    }
    return selecttextbox.value;
  }

  // COURSES RESET
  function handleCoursesReset() {
    document.getElementById("textboxfirstchoice").value = "";
    document.getElementById("textboxsecondchoice").value = "";
    document.getElementById("textboxthirdchoice").value = "";
  }

  // SUBMIT FORM
  const handleSubmit = () => {
    // POPUP CODE
    alert("Registration successful.");
    setContentLoading(true);

    // One of the code options below may solve hydration errors:
    // Router.push("https://va-stats.vercel.app/students", { shallow: true });
    // Router.push("https://va-stats.vercel.app/studentregistration", { shallow: true });
    Router.push(process.env.NEXT_PUBLIC_BASE_URL + 'testreg', { shallow: true });
  };

  return (
    // NextUIProvider BELOW: FOR EDUCATION DROPDOWN
    // <NextUIProvider>
    <>
      {contentLoading ?
        <div className={styles.overlay}>
          <span className={styles.customLoader}></span>
        </div>
        : <></>
      }

      <div className={styles.mynavbar}>
        <Navbar user_role={userRole} className={styles.navstudents} tabindex="-1" />
      </div>

      <div className={styles.container}>
        <Head>
          {/* Title changed per accessibility consultant - Pratik */}
          <title>
            student registration-Vision-Aid
          </title>

          {/* AVOID HYDRATION ERRORS w/ meta tag below; this may not work. */}
          <meta
            name="format-detection"
            content="telephone=no, date=no, email=no, address=no"
          />
        </Head>
        <main className={styles.main} suppressHydrationWarning>
          <div className={styles.title}>
            <h1>Student Registration</h1>
          </div>
          <div className={styles.studregcrsesinfo}>
            {/* Excel Sharepoint link */}
            {/* <a href="https://visionaidus.sharepoint.com/:x:/s/VADocumentLibrary_ExternalUsers/EZXuzdHpaKZGs2oWN_x-zJsBAYgzll9eycWx3SSWjQzwHA?e=1hs447" target="_blank">Courses - Details</a> */}
            {/* MS HTML conversion from Excel */}
            <a href="https://visionaid.dreamhosters.com/coursedetails.htm" target="_blank">Courses - Details</a>
          </div>
          <div>
            {/* Avoid hydration errors with code below; may not work.
              <form action='/api/studentapplication' method='post' onSubmit={() => handleSubmit()} suppressHydrationWarning> */}
            {/* NOTE Re: disabling form autocompletion: use role="presentation" autoComplete="off" for EACH form input. In the code below, they are placed on the same line to underscore they work together. */}
            <form action='/api/studentapplication' method='post' id='studentRegForm' onSubmit={() => handleSubmit()} autoComplete='off'>
              <div className={styles.grid}>
                {/*------- CARD: TRAINEE -------*/}
                <div
                  className={styles.card}
                >
                  <table id="formtable" className={styles.regtable} role="presentation" style={{ fontWeight: "500" }}>
                    <tbody>

                      <fieldset className={styles.sregfieldset}>
                        {/* <legend className={styles.sregfslegend}>Contact Info, Etc.</legend> */}
                        <legend className={styles.sregfslegend}>Personal Details</legend>
                        <div className="forminstruction">The fields marked with asterisks (<span className={styles.requiredelementlower}>*</span>) are required.</div>

                        {/*--------------- NAME BEGINS -----------*/}
                        <tr className={styles.regrow}>
                          <td className={styles.inputlabel}>
                            <label htmlFor="name">
                              Name
                            </label>
                            <span className={styles.requiredelement}>&#42;</span>
                          </td>
                          <td className={styles.inputtd}>
                            <input
                              id="name"
                              name="name"
                              className={styles.reginput}
                              maxLength="150"
                              // First entered name must start with an alphabet character and 
                              // can be followed by any character (dot and spaces included)
                              pattern="^[a-zA-Z].*[\s\.]*$"
                              // placeholder="First & last name"
                              placeholder="As per aadhaar"
                              type="text"
                              autoComplete="off"
                              role="presentation"
                              required
                            />
                          </td>
                        </tr>
                        {/*--------------- NAME ENDS -------------*/}

                        {/*---------- GENDER DROPDOWN BEGINS -----*/}
                        <tr className={styles.regrow}>
                          <td className={styles.inputlabel}>
                            <label htmlFor="gender">
                              Gender
                            </label>
                            <span className={styles.requiredelement}>&#42;</span>
                          </td>
                          <td className={styles.inputtd}>
                            <select
                              name="gender"
                              id="gender"
                              className={styles.txtboxdropdown}
                              onSelectionChange={setSelectedGender}
                              role="presentation" autoComplete="off"
                            >
                              <optgroup label="Gender">
                                <option value="Female">Female</option>
                                <option value="Male">Male</option>
                                <option value="Other">Other</option>
                              </optgroup>
                            </select>
                          </td>
                        </tr>
                        {/*---------- GENDER DROPDOWN ENDS -----*/}

                        {/*---------- DATE OF BIRTH BEGINS -----*/}
                        {/* <tr className={styles.regrow}>
                        <td className={styles.inputlabel}>
                          <label htmlFor="age">
                            Date of Birth
                          </label>
                          <span className={styles.requiredelement}>&#42;</span>
                        </td>
                        <td className={styles.inputtd}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              disableFuture
                              className="myDatePicker"
                              id="age"
                              name="age"
                              type="date"
                              selected={date}
                              onChange={(date) => setDate(date)}
                            />
                          </LocalizationProvider>
                        </td>
                        </tr> */}
                        <tr className={styles.regrow}>
                          <td className={styles.inputlabel}>
                            <label htmlFor="age">
                              Date of birth
                            </label>
                            <span className={styles.requiredelement}>&#42;</span>
                          </td>
                          <td className={styles.inputtd}>
                            <input
                              type="date"
                              id="age"
                              name="age"
                              className={styles.reginput}
                              onfocus="this.max=new Date().toLocaleDateString('fr-ca')"
                              onblur="if ((document.getElementById('age').value > this.max)) alert('WARNING: User age is less than 15!')"
                              role="presentation" autoComplete="off"
                              required
                            />
                          </td>
                        </tr>
                        {/*---------- DATE OF BIRTH ENDS -----*/}

                        {/*------------- EMAIL BEGINS --------*/}
                        <tr className={styles.regrow}>
                          <td className={styles.inputlabel}>
                            <label htmlFor="email">
                              Email
                            </label>
                            <span className={styles.requiredelement}>&#42;</span>
                          </td>
                          <td className={styles.inputtd}>
                            <input
                              // autoFocus
                              className={styles.reginput}
                              id="email"
                              name="email"
                              maxLength="50"
                              type="email"
                              role="presentation"
                              autoComplete="off"
                              required />
                          </td>
                        </tr>
                        {/*------------ EMAIL ENDS ---------*/}

                        {/*---------- PHONE BEGINS ---------*/}
                        <tr className={styles.regrow}>
                          <td className={styles.inputlabel}>
                            {/* Changed from 'Phone' per stakeholder */}
                            <label htmlFor="phone_number">
                              Phone number
                            </label>
                            <span className={styles.requiredelement}>&#42;</span>
                          </td>
                          <td className={styles.inputtd}>
                            <input
                              className={styles.reginput}
                              id="phone_number"
                              name="phone_number"
                              // placeholder="10 num only; no dashes"
                              placeholder="Enter 10 digits only"
                              type="tel"
                              pattern="\d{10}"
                              minLength={10} maxLength={10}
                              role="presentation" autoComplete="off"
                              required
                            />
                          </td>
                        </tr>
                        {/*------------- PHONE ENDS -------------*/}

                        {/*----- PARENT/GUARDIAN PH # BEGINS ----*/}
                        <tr className={styles.regrow}>
                          <td className={styles.inputlabel}>
                            <label htmlFor="alt_ph_num">
                              {/* Changed from Phone2 per stakeholder */}
                              Parent/guardian phone number
                            </label>
                          </td>
                          <td className={styles.inputtd}>
                            <input
                              className={styles.reginput}
                              id="alt_ph_num"
                              name="alt_ph_num"
                              placeholder="Enter 10 digits only"
                              type="tel"
                              pattern="\d{10}"
                              minLength={10} maxLength={10}
                              role="presentation" autoComplete="off"
                            />
                          </td>
                        </tr>
                        {/*------- PARENT/GUARDIAN PH # ENDS -------*/}

                        {/*------------ COUNTRY BEGINS -------------*/}
                        <tr className={styles.regrow}>
                          <td className={styles.inputlabel}>
                            <label htmlFor="country">
                              Country
                            </label>
                            <span className={styles.requiredelement}>&#42;</span>
                          </td>
                          <td className={styles.inputtd}>
                            <select
                              autoComplete="off"
                              className={styles.reginput}
                              id="country"
                              name="country"
                              onChange={(e) => updateStateOptions(e)}
                              required
                              role="presentation"
                            >
                              <option></option>
                              {countriesOptions}
                            </select>
                          </td>
                        </tr>
                        {/*------------ COUNTRY ENDS -------------*/}

                        {/*------------- STATE BEGINS ------------*/}
                        <tr className={styles.regrow}>
                          <td className={styles.inputlabel}>
                            <label htmlFor="state">
                              State
                            </label>
                            <span className={styles.requiredelement}>&#42;</span>
                          </td>
                          <td className={styles.inputtd}>
                            <select
                              autoComplete="off"
                              className={styles.reginput}
                              id="state"
                              name="state"
                              required
                              role="presentation"
                            >
                              <option></option>
                              {stateOptions}
                            </select>
                          </td>
                        </tr>
                        {/*------------- STATE ENDS ------------*/}

                        {/*------------- CITY BEGINS -----------*/}
                        <tr className={styles.regrow}>
                          <td className={styles.inputlabel}>
                            <label htmlFor="city">
                              City
                            </label>
                            <span className={styles.requiredelement}>&#42;</span>
                          </td>
                          <td className={styles.inputtd}>
                            <input
                              autoComplete="off"
                              className={styles.reginput}
                              id="city"
                              maxLength="35"
                              name="city"
                              role="presentation"
                              required
                              type="text"
                            />
                          </td>
                        </tr>
                        {/*------------- CITY ENDS -----------*/}

                        {/*--- NATURE OF DISABILITY BEGINS ---*/}
                        <tr className={styles.regrow}>
                          <td className={styles.inputlabel}>
                            <label htmlFor="disability">
                              Nature of disability
                            </label>
                            <span className={styles.requiredelement}>&#42;</span>
                          </td>
                          <td className={styles.dropdowndiv}>
                            <select
                              aria-label="Nature of disability"
                              className={styles.txtboxdropdown}
                              name="disability"
                              onChange={e => setSelectedDisability(e.target.value)}
                              // onSelectionChange={setSelectedDisability}
                              radius="none"
                              required
                              value={selectedDisability} // Force select's value to match state var
                            >
                              <option value="Visually impaired">Visually impaired</option>
                              <option value="VI with other disability">VI with other disability</option>
                              <option value="Other disability">Other disability</option>
                              <option value="Non-disabled">Non-disabled</option>
                            </select>
                          </td>
                        </tr>
                        {/*---- NATURE OF DISABILITY ENDS ----*/}

                        {/*---------- EDUCATION BEGINS -------*/}
                        <tr className={styles.regrow}>
                          <td className={styles.inputlabel}>
                            <label htmlFor="edu_qualifications">
                              Education
                            </label>
                            <span className={styles.requiredelement}>&#42;</span>
                          </td>
                          <td className={styles.dropdowndiv}>
                            <select
                              aria-label="Education attained"
                              className={styles.txtboxdropdown}
                              name="edu_qualifications"
                              onChange={e => setSelectedEdu(e.target.value)}
                              radius="none"
                              required
                              value={selectedEdu} // Force select's value to match state var
                            >
                              <option value="Below 10th standard">Below 10th standard</option>
                              <option value="10 standard">10 standard</option>
                              <option value="12 standard">12 standard</option>
                              <option value="Diploma">Diploma</option>
                              <option value="ITI">ITI</option>
                              <option value="Undergraduate">Undergraduate</option>
                              <option value="Graduate">Graduate</option>
                              <option value="Post-graduate">Post-graduate</option>
                              <option value="Professional degree">Professional degree</option>
                              <option value="Other (specify below)">Other (specify below)</option>
                            </select>
                          </td>
                        </tr>
                        {/*---------- EDUCATION ENDS --------*/}

                        {/*---- EDUCATION DETAILS BEGINS ----*/}
                        <tr className={styles.regrow}>
                          <td className={styles.inputlabel}>
                            <label htmlFor="edu_details">
                              Education details
                            </label>
                          </td>
                          <td className={styles.inputtd}>
                            <input
                              autoComplete="off"
                              class="bg-content-content1 bg-white focus:border-4 focus:border-blue-600 ps-1"
                              className={styles.reginput}
                              id="edu_details"
                              name="edu_details"
                              type="text"
                              role="presentation"
                            />
                          </td>
                        </tr>
                        {/*---- EDUCATION DETAILS ENDS ----*/}

                        {/*------- JOB STATUS BEGINS ------*/}
                        <tr className={styles.regrow}>
                          <td className={styles.inputlabel}>
                            <label htmlFor="employment_status">
                              Job status                            </label>
                            <span className={styles.requiredelement}>&#42;</span>
                          </td>
                          <td className={styles.inputtd}>
                            <select
                              autoComplete="off"
                              className={styles.txtboxdropdown}
                              id="employment_status"
                              name="employment_status"
                              onSelectionChange={setSelectedEmpStatus}
                              role="presentation"
                            >
                              <optgroup label="EmpStatus">
                                <option value="Employed">Employed</option>
                                <option value="Unemployed">Unemployed</option>
                                <option value="Student">Student</option>
                              </optgroup>
                            </select>
                          </td>
                        </tr>
                        {/*------- JOB STATUS ENDS ------*/}

                      </fieldset>

                    </tbody>
                  </table>
                </div>
                {/*---------- CARD: TRAINEE/TRAINER ENDS --------*/}

                {/*------------- CARD: COURSES BEGINS -----------*/}
                <div
                  className={styles.card}
                >
                  {/* <h2 tabindex="0">
                    Learning
                  </h2> */}
                  {/*-------------- Learning Context -----------*/}
                  {/* <fieldset className={styles.fdsetlearning}> */}
                  <fieldset className={styles.sregfieldsetlearn}>
                    {/* <legend style={{ fontWeight: 700 }}>Learning Context</legend> */}
                    <legend className={styles.sregfslegend}>Learning Context</legend>
                    <table className={styles.tblchoosecourses} role="presentation">
                      <tr className={styles.regrow}>
                        <td className={styles.tdlblcrschoice}>
                          <label htmlFor="objectives">
                            Goal(s)
                          </label>
                        </td>
                        <td className={styles.inputtd}>
                          <textarea
                            className={styles.regtextareagoals}
                            id="objectives"
                            maxLength="100"
                            name="objectives"
                            onKeyDown={(e) => textAreaHandleEnter(e)}
                            placeholder="Reasons for seeking training (100-char max)"
                            width="100%"
                            role="presentation" autoComplete="off"
                          />
                        </td>
                      </tr>
                    </table>
                  </fieldset>

                  {/*-------------- Course choices -------------*/}
                  <fieldset className={styles.sregfieldsetcourses}>
                    <legend className={styles.sregfslegend}>Course Priorities</legend>
                    <table className={styles.tblchoosecourses} role="presentation">

                      {/*----------- 1st choice ----------*/}
                      <tr>
                        <td className={styles.tdlblcrschoice}>
                          <label htmlFor="first_choice">
                            1st choice
                          </label>
                          <span className={styles.requiredelement}>&#42;</span>
                        </td>
                        <td className={styles.inputtd}>
                          <select name="first_choice" id="first_choice" className={styles.reginput} onChange={(e) => updateChoices(e)} ref={refFirstChoice} role="presentation" autoComplete="off" required>
                            <option></option>
                            {courseOptions1}
                            {/* <option selected="selected">Select First Choice</option> */}
                          </select>
                        </td>
                      </tr>

                      {/*----------- 2nd choice ----------*/}
                      <tr>
                        <td className={styles.tdlblcrschoice}>
                          <label htmlFor="second_choice">
                            2nd choice
                          </label>
                          {/* <span className={styles.requiredelement}>&#42;</span> */}
                        </td>
                        <td className={styles.inputtd}>
                          <select name="second_choice" id="second_choice" className={styles.reginput} onChange={(e) => updateChoices(e)} role="presentation" autoComplete="off">
                            <option></option>
                            {courseOptions2}
                            {/* <option selected="selected">Select Second Choice</option> */}
                          </select>
                        </td>
                      </tr>

                      {/*----------- 3rd choice ----------*/}
                      <tr>
                        <td className={styles.tdlblcrschoice}>
                          <label htmlFor="third_choice">
                            3rd choice
                          </label>
                        </td>
                        <td className={styles.inputtd}>
                          {/* Before alert box course summaries */}
                          {/* <select name="third_choice" id="third_choice" className={styles.reginput} role="presentation" autoComplete="off" required> */}

                          <select name="third_choice" id="third_choice" className={styles.reginput} onChange={(e) => updateChoices(e)} role="presentation" autoComplete="off">
                            <option></option>
                            {courseOptions3}
                            {/* <option selected="selected">Select Third Choice</option> */}
                          </select>
                        </td>
                      </tr>
                      <tr className={styles.regrow}>
                        <td className={styles.inputlabel}>
                          <label htmlFor="source">
                            How you found us
                          </label>
                        </td>
                        <td className={styles.inputtd}>
                          <input
                            className={styles.reginput}
                            id="source"
                            maxLength={50}
                            name="source"
                            placeholder="E.g., internet, 50-char. max."
                            ref={refSource}
                            type="textbox"
                            role="presentation" autoComplete="off"
                          />
                        </td>
                      </tr>
                    </table>
                  </fieldset>

                  {/*--- Warning re: registering more than one time ---*/}
                  {/* <fieldset className={styles.fdsetlearning}>
                      <legend style={{ fontWeight: '700', color: 'red' }}>ATTENTION</legend>
                      <table className={styles.tblchoosecourses} role="presentation">
                        <tr className={styles.regrow}>
                          <td className={styles.tdlblcrschoice}>
                          </td>
                          <td className={styles.inputtd} style={{ fontWeight: '700' }}>
                            If you register more than one time, only your most recent registration will be retained.
                          </td>
                        </tr>
                      </table>
                    </fieldset> */}
                </div>
                {/*------------- CARD: COURSES ENDS ------------*/}

                {/*------------- CARD: MEDICAL BEGINS ----------*/}
                <div className={styles.card}>
                  <table className={styles.tblmisc} role="presentation">
                    <fieldset className={styles.sregfieldsetmedical}>
                      <legend className={styles.sregfslegendmedical}>Vision Details</legend>
                      <tr className={styles.regrow}>
                        <td className={`${styles["inputlabel"]} ${styles["inputlabelmisc"]}`}>
                          <label htmlFor="visual_acuity">
                            Visual acuity
                          </label>
                          <span className={styles.requiredelement}>&#42;</span>
                        </td>

                        {/*-------------- VISION DROPDOWN BEGINS ------------*/}
                        <td className={styles.inputtd}>
                          <select
                            onFocus={() => checkDropdown()}
                            name="visual_acuity"
                            id="visual_acuity"
                            className={styles.txtboxdropdown}
                            onSelectionChange={setSelectedVision}
                            role="presentation" autoComplete="off"
                            required
                          >
                            <option value="LowVision">Low Vision</option>
                            <option value="Blind">Blind</option>
                          </select>
                        </td>
                        {/*--------------- VISION DROPDOWN ENDS ---------------*/}
                      </tr>

                      <tr className={styles.regrow}>
                        <td className={styles.inputlabel}>
                          <label htmlFor="percent_loss">
                            Percentage of vision loss
                          </label>
                          <span className={styles.requiredelement}>&#42;</span>
                        </td>
                        <td className={styles.inputtd}>
                          <input
                            onFocus={() => checkDropdown()}
                            className={styles.reginput}
                            id="percent_loss"
                            // min={0}
                            // max={100}
                            // min="1"
                            // max="10"
                            name="percent_loss"
                            // onChange={(e) => checkVisionLoss(e)}
                            // onBlur={(e) => checkVisionLoss(e)}
                            // onBlur={() => alert("You entered: "+this.value)}
                            placeholder="1-99"
                            type="number"
                            role="presentation" autoComplete="off"
                            required
                          />
                        </td>
                      </tr>
                      <tr className={styles.regrow}>
                        <td className={styles.inputlabel}>
                          <label htmlFor="impairment_history">
                            Vision impairment history (brief; feel free to leave it empty)
                          </label>
                        </td>
                        <td className={styles.inputtd}>
                          <textarea
                            name="impairment_history"
                            id="impairment_history"
                            maxLength={200}
                            placeholder='200-char max'
                            className={styles.regtextareaimpair}
                            rows="10"
                            cols="20"
                            type="text"
                            onKeyDown={(e) => textAreaHandleEnter(e)}
                            role="presentation" autoComplete="off">
                          </textarea>
                        </td>
                      </tr>
                      {/* <tr className={styles.regrow}>
                        <td className={styles.inputlabel}>
                          <label htmlFor="source">
                            How you found us
                          </label>
                        </td>
                        <td className={styles.inputtd}>
                          <input
                            className={styles.reginput}
                            id="source"
                            maxLength={50}
                            name="source"
                            placeholder="E.g., internet, 50-char. max."
                            ref={refSource}
                            type="textbox"
                            role="presentation" autoComplete="off"
                          />
                        </td>
                      </tr> */}
                    </fieldset>
                  </table>

                  {/* RESET AND SUBMIT BUTTONS 
                  NOTE: Backticks, not vertical single quotes, are required below */}
                  <div className={styles.frmbtnblocksubres}>
                    <button type="submit" aria-label="Submit form" className={`${styles.btnsubmit} ${styles.btngetsfocus}`} onClick={() => { checkDropdown(); checkSecondCourseChoice(); checkThirdCourseChoice(); }}>SUBMIT</button>
                    <button type="reset" aria-label="Reset form" className={`${styles.btnreset} ${styles.btngetsfocus}`}>RESET</button>
                  </div>
                </div>
                {/*--------- CARD: MEDICAL ENDS --------*/}

              </div>  {/* GRID LAYOUT ENDS */}
            </form>
          </div>
        </main>

        <footer className={styles.footernewreg}>
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
              Powered by{" "}
              <Image src='/vercel.svg'
                alt='Vercel Logo'
                width={72}
                height={16} />
            </span>
          </a>
        </footer>

      </div>    {/* Container closing tag */}
    </>
    // </NextUIProvider>
  );

}
