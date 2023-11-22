"use client";
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { NextUIProvider } from '@nextui-org/react';
import React from "react";
import ReactDOM from 'react-dom'; // Education dynamic textbox creation
import Router from "next/router";                   // Popup confirmation

import styles from "../styles/StudentReg.module.css";

// Education input
import Combobox from "react-widgets/Combobox";
import "react-widgets/styles.css";

import { useSession } from 'next-auth/react';
import { useForm } from "react-hook-form";
import { useEffect, useState } from 'react';
import { useRef } from 'react';

let worldData = require("../utils/countries+states.json");
var userRole = "STAFF";

export default function Page() {
  useForm(); // Form reset
  const { data: session, status } = useSession();
  var result;

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
    if (e == "python") {
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
    worldData.map(country => {
      countries.push(<option value={country.name}>{country.name}</option>);
    });
    setCountriesOptions(countries);
  };

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

  /*-------------- EDUCATION DROPDOWN BEGINS --------------*/
  let widget = (
    <Combobox
      autoComplete="off"
      // border="3px"
      // color="black"
      // defaultValue={"Below 10th standard"}
      className={styles.txtboxdropdown}
      dropUp
      data={[
        "Below 10th standard",
        "10 standard",
        "12 standard",
        "Diploma",
        "ITI",
        "Undergraduate",
        "Graduate",
        "Post-graduate",
        "Professional degree",
        "Other (also 'Ed. Details')"
      ]}
      id="edu_qualifications"
      maxLength="80"
      name="edu_qualifications"
      placeholder="Highest level: 80-char max"
      role="presentation"
      required
    />
  );
  /*-------------- EDUCATION DROPDOWN ENDS --------------*/

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
    // NextUIProvider BELOW: FOR SSRPROVIDER ERRORS
    <NextUIProvider>
      <>
        {contentLoading ?
          <div className={styles.overlay}>
            <span className={styles.customLoader}></span>
          </div>
          : <></>
        }

        {/* Course summary dialog */}
        {/* <dialog id="favDialog">
        <form method="dialog">
          <p>{courseSummary}</p>
          <button>Close dialog</button>
        </form>
      </dialog> */}

        <div className={styles.mynavbar}>
          <Navbar user_role={userRole} className={styles.navstudents} />
        </div>

        <div className={styles.container}>
          <Head>
            <title>
              Student Registration
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
                    <h2>
                      Trainee
                    </h2>
                    <table id="formtable" className={styles.regtable} role="presentation" style={{ fontWeight: "500" }}>
                      <tbody>
                        <tr className={styles.regrow}>
                          <td className={styles.inputlabel}>
                            <label htmlFor="email">
                              Email
                            </label>
                            <span className={styles.requiredelement}>&#42;</span>
                          </td>
                          <td className={styles.inputtd}>
                            <input
                              autoFocus
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
                              placeholder="First & last name"
                              type="text"
                              autoComplete="off"
                              role="presentation"
                              required
                            />
                          </td>
                        </tr>
                        <tr className={styles.regrow}>
                          <td className={styles.inputlabel}>
                            <label htmlFor="phone_number">
                              Phone
                            </label>
                            <span className={styles.requiredelement}>&#42;</span>
                          </td>
                          <td className={styles.inputtd}>
                            <input
                              className={styles.reginput}
                              id="phone_number"
                              name="phone_number"
                              placeholder="10 num only; no dashes"
                              type="tel"
                              pattern="\d{10}"
                              minLength={10} maxLength={10}
                              role="presentation" autoComplete="off"
                              required
                            />
                          </td>
                        </tr>
                        <tr className={styles.regrow}>
                          <td className={styles.inputlabel}>
                            <label htmlFor="alt_ph_num">
                              Phone2
                            </label>
                          </td>
                          <td className={styles.inputtd}>
                            <input
                              className={styles.reginput}
                              id="alt_ph_num"
                              name="alt_ph_num"
                              placeholder="10 num only; no dashes"
                              type="tel"
                              pattern="\d{10}"
                              minLength={10} maxLength={10}
                              role="presentation" autoComplete="off"
                            />
                          </td>
                        </tr>
                        <tr className={styles.regrow}>
                          <td className={styles.inputlabel}>
                            <label htmlFor="country">
                              Country
                            </label>
                            <span className={styles.requiredelement}>&#42;</span>
                          </td>
                          <td className={styles.inputtd}>
                            <select name="country" id="country" className={styles.reginput} onChange={(e) => updateStateOptions(e)} role="presentation" autoComplete="off" required>
                              <option></option>
                              {countriesOptions}
                            </select>
                          </td>
                        </tr>
                        <tr className={styles.regrow}>
                          <td className={styles.inputlabel}>
                            <label htmlFor="state">
                              State
                            </label>
                            <span className={styles.requiredelement}>&#42;</span>
                          </td>
                          <td className={styles.inputtd}>
                            <select name="state" id="state" className={styles.reginput} role="presentation" autoComplete="off" required>
                              <option></option>
                              {stateOptions}
                            </select>
                          </td>
                        </tr>
                        <tr className={styles.regrow}>
                          <td className={styles.inputlabel}>
                            <label htmlFor="city">
                              City
                            </label>
                            <span className={styles.requiredelement}>&#42;</span>
                          </td>
                          <td className={styles.inputtd}>
                            <input
                              className={styles.reginput}
                              id="city"
                              maxLength="35"
                              name="city"
                              type="text"
                              role="presentation" autoComplete="off"
                              required
                            />
                          </td>
                        </tr>

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

                        <tr className={styles.regrow}>
                          <td className={styles.inputlabel}>
                            <label htmlFor="age">
                              Birthdate
                            </label>
                            <span className={styles.requiredelement}>&#42;</span>
                          </td>
                          <td className={styles.inputtd}>
                            <input
                              type="date"
                              id="age"
                              name="age"
                              className={styles.reginput}
                              role="presentation" autoComplete="off"
                              required
                            />
                          </td>
                        </tr>

                        {/*----- EMPLOYMENT STATUS ROW BEGINS -----*/}
                        <tr className={styles.regrow}>
                          <td className={styles.inputlabel}>
                            <label htmlFor="employment_status">
                              Job status                            </label>
                            <span className={styles.requiredelement}>&#42;</span>
                          </td>
                          <td className={styles.inputtd}>
                            <select
                              name="employment_status"
                              id="employment_status"
                              className={styles.txtboxdropdown}
                              onSelectionChange={setSelectedEmpStatus}
                              role="presentation" autoComplete="off"
                            >
                              <optgroup label="EmpStatus">
                                <option value="Employed">Employed</option>
                                <option value="Unemployed">Unemployed</option>
                                <option value="Student">Student</option>
                              </optgroup>
                            </select>
                          </td>
                        </tr>

                        {/*----- EDU QUALIFICATIONS ROW BEGINS -----*/}
                        <tr className={styles.regrow}>
                          <td className={styles.inputlabel}>
                            <label htmlFor="edu_qualifications">
                              Education (choose or type)
                            </label>
                            <span className={styles.requiredelement}>&#42;</span>
                          </td>
                          <td className={styles.inputtd}>
                            {widget}
                          </td>
                        </tr>
                        {/*----- EDU QUALIFICATIONS ROW ENDS -----*/}

                        <tr className={styles.regrow}>
                          <td className={styles.inputlabel}>
                            <label htmlFor="edu_details">
                              Education Details
                            </label>
                            {/* <span className={styles.requiredelement}>&#42;</span> */}
                          </td>
                          <td className={styles.inputtd}>
                            <input
                              autoComplete="off"
                              className={styles.reginput}
                              id="edu_details"
                              maxLength="35"
                              name="edu_details"
                              type="text"
                              role="presentation"
                              required
                            />
                          </td>
                        </tr>

                      </tbody>
                    </table>
                  </div>
                  {/*---------- CARD: TRAINEE/TRAINER ENDS --------*/}

                  {/*------------- CARD: COURSES BEGINS -----------*/}
                  <div
                    className={styles.card}
                  >
                    <h2>
                      Learning
                    </h2>
                    {/*-------------- Learning Context -----------*/}
                    <fieldset className={styles.fdsetlearning}>
                      <legend style={{ fontWeight: 700 }}>Learning Context</legend>
                      <table className={styles.tblchoosecourses} role="presentation">
                        <tr className={styles.regrow}>
                          <td className={styles.tdlblcrschoice}>
                            <label htmlFor="objectives">
                              Goal(s)
                            </label>
                            <span className={styles.requiredelement}>&#42;</span>
                          </td>
                          <td className={styles.inputtd}>
                            <textarea
                              className={styles.regtextareagoals}
                              id="objectives"
                              maxLength="50"
                              name="objectives"
                              onKeyDown={(e) => textAreaHandleEnter(e)}
                              placeholder="50-char max"
                              width="100%"
                              role="presentation" autoComplete="off"
                              required
                            />
                          </td>
                        </tr>
                      </table>
                    </fieldset>

                    {/*-------------- Course choices -------------*/}
                    <fieldset className={styles.fdsetlearning}>
                      <legend style={{ fontWeight: 700 }}>Course Priorities</legend>
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
                              <option selected="selected">Select First Choice</option>
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
                              <option selected="selected">Select Second Choice</option>
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
                              <option selected="selected">Select Third Choice</option>
                            </select>
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

                  {/*------------- CARD: MISCELLANEOUS BEGINS ----------*/}
                  <div className={styles.card}>
                    <h2>
                      Miscellaneous
                    </h2>
                    <table className={styles.tblmisc} role="presentation">
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
                            Percent of vision loss
                          </label>
                          <span className={styles.requiredelement}>&#42;</span>
                        </td>
                        <td className={styles.inputtd}>
                          <input
                            onFocus={() => checkDropdown()}
                            className={styles.reginput}
                            id="percent_loss"
                            max={100}
                            name="percent_loss"
                            placeholder="0-100"
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

                    {/* RESET AND SUBMIT BUTTONS 
                  NOTE: Backticks, not vertical single quotes, are required below */}
                    <div className={styles.frmbtnblocksubres}>
                      <button type="submit" aria-label="Submit form" className={`${styles.btnsubmit} ${styles.btngetsfocus}`} onClick={() => { checkDropdown(); checkSecondCourseChoice(); checkThirdCourseChoice(); }}>SUBMIT</button>
                      <button type="reset" aria-label="Reset form" className={`${styles.btnreset} ${styles.btngetsfocus}`}>RESET</button>
                    </div>
                  </div>
                  {/*--------- CARD: MISCELLANEOUS ENDS --------*/}

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
    </NextUIProvider >
    //)
  );
}
