"use client";

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { NextUIProvider } from '@nextui-org/react';
import React from "react";
import Router from "next/router";                   // Popup confirmation
import styles from "../styles/StudentReg.module.css";
import { useForm } from "react-hook-form";
import { useEffect, useState } from 'react';
import { useRef } from 'react';
let worldData = require("../utils/countries+states.json");

export default function Page() {
  useForm(); // Form reset

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

  const pythonSummary = "The Python class goal is to develop skills to write simple applications using Python programming language.";
  const cSummary = "The C language is a powerful language with a wide variety of uses. It has been used to create databases, applications, and even operating systems.";
  const cplusplusSummary = "The C++ language is very popular. It has played a key role in the development of a wide variety of software, including video games.";
  const ccaSummary = "This is our Certificate Course in Computer Applications (CCA). The student will acquire a basic understanding of computers and practical knowledge of using computer applications and voice assisted software.";
  const phpSummary = "The PHP language is widely used in Information Technology. It is especially helpful in connecting databases to websites.";
  const htmlSummary = "HTML is our broad course on critical website languages. The student will acquire skills in HTML, CSS, JavaScript, and ARIA Fundamentals for accessible Web development.";
  const mobtechSummary = "The Mobile Technology course will enable a person with visual impairment to effectively use the modern-day smartphone for day-to-day work, mobility and comfort.";
  const cssSummary = "The CSS course is for people who want to devlelop the skills to style websites. The student will learn to manipulate color, fonts, and a variety of other web page characteristics.";

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

  // const showDialog = (e) => {
  //   document.write("<dialog id='favDialog'><form method='dialog'><p>Hello</p><button>Close dialog</button></form></dialog>");
  // };

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

  /*-------------- DROPDOWNS BEGIN -----------*/
  // GENDER
  const [selectedGender, setSelectedGender] = React.useState(new Set(["Female"]));
  const selectedValueGender = React.useMemo(
    () => Array.from(selectedGender).join(", ").replaceAll("_", " "),
    [selectedGender]
  );

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
  /*-------------- DROPDOWNS END -----------*/

  /* ADD COURSE CHOICE */
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
          <Navbar className={styles.navstudents} />
        </div>

        <div className={styles.container}>
          <Head>
            <title>
              Student Registration
            </title>

            {/* AVOID HYDRATION ERRORS w/ meta tag below
            may not work. */}
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
              <a href="https://visionaidus.sharepoint.com/:x:/s/VADocumentLibrary_ExternalUsers/EZXuzdHpaKZGs2oWN_x-zJsBAYgzll9eycWx3SSWjQzwHA?e=1hs447" target="_blank">Courses - Details</a>
            </div>
            <div>
              {/* Avoid hydration errors with code below; may not work.
              <form action='/api/studentapplication' method='post' onSubmit={() => handleSubmit()} suppressHydrationWarning> */}
              {/* NOTE Re: disabling form autocompletion: use role="presentation" autocomplete="off" for EACH form input. In the code below, they are placed on the same line to underscore they work together. */}
              <form action='/api/studentapplication' method='post' onSubmit={() => handleSubmit()} autocomplete='off'>
                <div className={styles.grid}>
                  {/*------- CARD: TRAINEE -------*/}
                  <div
                    className={styles.card}
                  >
                    <h2>
                      Trainee
                    </h2>
                    <table className={styles.regtable} role="presentation" style={{ fontWeight: "500" }}>
                      <tbody>
                        <tr className={styles.regrow}>
                          <td className={styles.inputlabel}>
                            <label htmlFor="email">
                              Email
                            </label>
                            <span className={styles.requiredelement}>&#42;</span>
                          </td>
                          <td className={styles.inputtd}>
                            <input type="email" autoFocus id="email" name="email" className={styles.reginput} role="presentation" autocomplete="off" required />
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
                              placeholder="First & last name"
                              type="text"
                              id="name"
                              name="name"
                              className={styles.reginput}
                              role="presentation" autocomplete="off"
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
                              maxLength="10"
                              name="phone_number"
                              placeholder="10 num only; no dashes"
                              type="tel"
                              role="presentation" autocomplete="off"
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
                              type="tel"
                              id="alt_ph_num"
                              name="alt_ph_num"
                              className={styles.reginput}
                              role="presentation" autocomplete="off"
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
                            <select name="country" id="country" className={styles.reginput} onChange={(e) => updateStateOptions(e)} role="presentation" autocomplete="off" required>
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
                            <select name="state" id="state" className={styles.reginput} role="presentation" autocomplete="off" required>
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
                              type="text"
                              id="city"
                              name="city"
                              className={styles.reginput}
                              role="presentation" autocomplete="off"
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
                              role="presentation" autocomplete="off"
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
                              role="presentation" autocomplete="off"
                              required
                            />
                          </td>
                        </tr>

                        <tr className={styles.regrow}>
                          <td className={styles.inputlabel}>
                            <label htmlFor="edu_qualifications">
                              Education
                            </label>
                            <span className={styles.requiredelement}>&#42;</span>
                          </td>
                          <td className={styles.inputtd}>
                            <input
                              type="text"
                              id="edu_qualifications"
                              name="edu_qualifications"
                              className={styles.reginput}
                              placeholder="Degrees, etc, 300-char max"
                              role="presentation" autocomplete="off"
                              required
                            />
                          </td>
                        </tr>

                        {/*----- EMPLOYMENT STATUS DROPDOWN BEGINS -----*/}
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
                              role="presentation" autocomplete="off"
                            >
                              <optgroup label="EmpStatus">
                                <option value="Employed">Employed</option>
                                <option value="Unemployed">Unemployed</option>
                                <option value="Student">Student</option>
                              </optgroup>
                            </select>
                          </td>
                          {/*----- EMPLOYMENT STATUS DROPDOWN ENDS -----*/}
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
                              name="objectives"
                              placeholder="200-char max"
                              width="100%"
                              onKeyDown={(e) => textAreaHandleEnter(e)}
                              role="presentation" autocomplete="off"
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
                            <select name="first_choice" id="first_choice" className={styles.reginput} onChange={(e) => updateChoices(e)} ref={refFirstChoice} role="presentation" autocomplete="off" required>
                              <option></option>
                              {courseOptions1}
                            </select>
                          </td>
                        </tr>

                        {/*----------- 2nd choice ----------*/}
                        <tr>
                          <td className={styles.tdlblcrschoice}>
                            <label htmlFor="second_choice">
                              2nd choice
                            </label>
                            <span className={styles.requiredelement}>&#42;</span>
                          </td>
                          <td className={styles.inputtd}>
                            <select name="second_choice" id="second_choice" className={styles.reginput} onChange={(e) => updateChoices(e)} role="presentation" autocomplete="off" required>
                              <option></option>
                              {courseOptions2}
                            </select>
                          </td>
                        </tr>

                        {/*----------- 3rd choice ----------*/}
                        <tr>
                          <td className={styles.tdlblcrschoice}>
                            <label htmlFor="third_choice">
                              3rd choice
                            </label>
                            <span className={styles.requiredelement}>&#42;</span>
                          </td>
                          <td className={styles.inputtd}>
                            {/* Before alert box course summaries */}
                            {/* <select name="third_choice" id="third_choice" className={styles.reginput} role="presentation" autocomplete="off" required> */}

                            <select name="third_choice" id="third_choice" className={styles.reginput} onChange={(e) => updateChoices(e)} role="presentation" autocomplete="off" required>
                              <option></option>
                              {courseOptions3}
                            </select>
                          </td>
                        </tr>

                      </table>
                    </fieldset>
                  </div>
                  {/*------------- CARD: COURSES ENDS ------------*/}

                  {/*------------- CARD: MISCELLANEOUS BEGINS ----------*/}
                  <div className={styles.card}>
                    <h2>
                      Miscellaneous
                    </h2>
                    <table className={styles.tblmisc} role="presentation">
                      <tr className={styles.regrow}>
                        {/* <td className={styles.inputlabel}> */}
                        <td className={`${styles["inputlabel"]} ${styles["inputlabelmisc"]}`}>
                          <label htmlFor="visual_acuity">
                            Visual acuity
                          </label>
                          <span className={styles.requiredelement}>&#42;</span>
                        </td>

                        {/*-------------- VISION DROPDOWN BEGINS ------------*/}
                        <td className={styles.inputtd}>
                          <select
                            name="visual_acuity"
                            id="visual_acuity"
                            className={styles.txtboxdropdown}
                            onSelectionChange={setSelectedVision}
                            role="presentation" autocomplete="off"
                            required
                          >
                            <optgroup label="Visual Acuity">
                              <option value="LowVision">Low Vision</option>
                              <option value="Blind">Blind</option>
                            </optgroup>
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
                            className={styles.reginput}
                            id="percent_loss"
                            name="percent_loss"
                            type="text"
                            role="presentation" autocomplete="off"
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
                            placeholder='300-char max'
                            className={styles.regtextareaimpair}
                            rows="10"
                            cols="20"
                            onKeyDown={(e) => textAreaHandleEnter(e)}
                            role="presentation" autocomplete="off">
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
                            name="source"
                            placeholder="Internet, friend, etc."
                            type="textbox"
                            ref={refSource}
                            role="presentation" autocomplete="off"
                          />
                        </td>
                      </tr>
                    </table>

                    {/* RESET AND SUBMIT BUTTONS 
                  NOTE: Backticks, not vertical single quotes, are required below */}
                    <div className={styles.frmbtnblocksubres}>
                      <button type="submit" aria-label="Submit form" className={`${styles.btnsubmit} ${styles.btngetsfocus}`}>SUBMIT</button>
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
    </NextUIProvider>
    //)
  );
}
