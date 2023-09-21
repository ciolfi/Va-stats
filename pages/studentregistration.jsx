"use client";

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { NextUIProvider } from '@nextui-org/react';
import React from "react";
import Router from "next/router";                   // popup confirmation
import styles from "../styles/StudentReg.module.css";
import { useForm } from "react-hook-form";
import { useState } from 'react';


/*------- Imports for possible future use: --------*/
// import { Dropdown } from "@nextui-org/react";

// ssrProvider errors:
// import { useSSR } from '@nextui-org/react';

// 'Courses' sub-form reset
// import * as React from "react";


// export default function Home() {
export default function Page() {
  useForm(); // Form reset


  // FOR SSRPROVIDER ERRORS:
  // const { isBrowser } = useSSR();

  const [contentLoading, setContentLoading] = useState(false);
  // const [contentLoading, setContentLoading] = useState(true);

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
    //TRY
    // var firstchoicebox = document.getElementById("textboxfirstchoice");
    for (let i = 0; i < chosencourse.length; i++) {
      if (chosencourse[i].checked) {
        if (coursepriority == "firstchoice") {
          var selecttextbox = document.getElementById("textboxfirstchoice");
          selecttextbox.value = chosencourse[i].value;
          // TRY
          // firstchoicebox.value = selecttextbox.value;
          // return firstchoicebox.value;
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
    // ENABLE INPUTS FOR COURSE CHOICE VALUES
    // var first_choice = document.getElementById("textboxfirstchoice").value;
    // document.getElementById("textboxsecondchoice").disabled = false;
    // document.getElementById("textboxthirdchoice").disabled = false;

    // POPUP CODE
    alert("Registration successful.");
    setContentLoading(true);
    // Router.push("https://va-stats.vercel.app/students", { shallow: true });
    // Router.push("https://va-stats.vercel.app/studentregistration", { shallow: true });

    Router.push(process.env.NEXT_PUBLIC_BASE_URL + 'testreg', { shallow: true });
  };

  return (
    // 2 CODE LINES BELOW: FOR SSRPROVIDER ERRORS
    // isBrowser && (
    <NextUIProvider>
      <>
        {contentLoading ?
          <div className={styles.overlay}>
            <span className={styles.customLoader}></span>
          </div>
          : <></>
        }

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
              <a href="https://visionaid.org/educate" target="_blank">Courses - Details</a>
            </div>
            <div>
              {/* Avoid hydration errors with code below; may not work.
              <form action='/api/studentapplication' method='post' onSubmit={() => handleSubmit()} suppressHydrationWarning> */}
              <form action='/api/studentapplication' method='post' onSubmit={() => handleSubmit()} autoComplete="off">
                <div className={styles.grid}>

                  {/*------- CARD: TRAINEE -------*/}
                  <div
                    className={styles.card}
                  >
                    <h2>
                      Trainee
                    </h2>
                    <table className={styles.regtable} role="presentation" style={{ fontWeight: "500" }}>
                      {/* <thead>
                      <tr><td>Label</td><td>Input</td></tr>
                    </thead> */}
                      <tbody>
                        <tr className={styles.regrow}>
                          <td className={styles.inputlabel}>
                            <label htmlFor="email">
                              Email
                            </label>
                            <span className={styles.requiredelement}>&#42;</span>
                          </td>
                          <td className={styles.inputtd}>
                            <input type="email" autoFocus id="email" name="email" className={styles.reginput} required />
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
                              required
                            // value={value}
                            // onChange={handleChange}
                            // onBlur={checkConstraints}
                            />
                          </td>
                        </tr>
                        <tr className={styles.regrow}>
                          <td className={styles.inputlabel}>
                            <label htmlFor="alt_ph_num">
                              Alt. Phone
                            </label>
                          </td>
                          <td className={styles.inputtd}>
                            <input
                              type="tel"
                              id="alt_ph_num"
                              name="alt_ph_num"
                              className={styles.reginput}
                            />
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
                              required
                            />
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
                            <input
                              type="text"
                              id="state"
                              name="state"
                              className={styles.reginput}
                              required
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
                            <input
                              className={styles.reginput}
                              id="country"
                              name="country"
                              type="text"
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
                            {/* <Dropdown
                              name='gender'>
                              <Dropdown.Button
                                className='btngenderdropdown'
                                disableripple="true"
                                size="sm"
                                style={{
                                  // backgroundColor below: must be RGB
                                  backgroundColor: 'var(--vagreenmedium-background)',
                                  height: '2em',
                                  marginTop: '0.5em',
                                  width: '100%',
                                }}
                                variant="shadow"
                              >
                                {selectedValueGender}
                              </Dropdown.Button>
                              <Dropdown.Menu
                                aria-label="Single selection actions"
                                disallowEmptySelection
                                selectionMode="single"
                                selectedKeys={selectedGender}
                                onSelectionChange={setSelectedGender}
                              >
                                <Dropdown.Item key="Female">Female</Dropdown.Item>
                                <Dropdown.Item key="Male">Male</Dropdown.Item>
                                <Dropdown.Item key="Other">Other</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown> */}

                            <select
                              name="gender"
                              id="gender"
                              className={styles.txtboxdropdown}
                              onSelectionChange={setSelectedGender}
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
                            {/* <Dropdown id='employment_status' name='employment_status'>
                              <Dropdown.Button
                                disableripple="true"
                                size="sm"
                                style={{
                                  // backgroundColor below: must be RGB
                                  backgroundColor: 'var(--vagreenmedium-background)',
                                  height: '2em',
                                  marginTop: '0.5em',
                                  width: '100%'
                                }}
                                variant='shadow'
                              >
                                {selectedValueEmpStatus}
                              </Dropdown.Button>
                              <Dropdown.Menu
                                aria-label='Single selection actions'
                                disallowEmptySelection
                                selectionMode='single'
                                selectedKeys={selectedEmpStatus}
                                onSelectionChange={setSelectedEmpStatus}
                              >
                                <Dropdown.Item key='Employed'>Employed</Dropdown.Item>
                                <Dropdown.Item key='Unemployed'>Unemployed</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown> */}

                            <select
                              name="employment_status"
                              id="employment_status"
                              className={styles.txtboxdropdown}
                              onSelectionChange={setSelectedEmpStatus}
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

                        {/* <tr className={styles.regrow}>
                          <td className={styles.inputlabel}>
                            <label htmlFor="objectives">
                              Learning goal(s)
                            </label>
                            <span className={styles.requiredelement}>&#42;</span>
                          </td>
                          <td className={styles.inputtd}>
                            <input
                              type="text"
                              id="objectives"
                              name="objectives"
                              className={styles.reginput}
                              placeholder="300-char max"
                              required
                            />
                          </td>
                        </tr>
                        <tr className={styles.regrow}>
                          <td className={styles.inputlabel}>
                            <label htmlFor="trainer_name">
                              {/* FRM EL #13/21 
                              Trainer name
                            </label>
                          </td>
                          <td className={styles.inputtd}>
                            <input
                              className={styles.reginput}
                              placeholder="Firstname Lastname"
                              type="text"
                              id="trainer_name"
                              name="trainer_name"
                            />
                          </td>
                        </tr> */}
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
                              // cols="10"
                              id="objectives"
                              name="objectives"
                              placeholder="200-char max"
                              // rows="8"
                              width="100%"
                              required
                            />
                          </td>
                        </tr>
                        {/* <tr className={styles.regrow}>
                          <td className={styles.tdlblcrschoice}>
                            <label htmlFor="trainer_name">
                              Trainer name
                            </label>
                          </td>
                          <td className={styles.inputtd}>
                            <input
                              className={styles.reginput}
                              placeholder="Firstname Lastname"
                              type="text"
                              id="trainer_name"
                              name="trainer_name"
                            />
                          </td>
                        </tr> */}
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
                          </td>
                          <td className={styles.inputtd}>
                            <select name="first_choice" id="first_choice" className={styles.reginput}>
                              <option value="Python">Python</option>
                              <option value="C">C</option>
                              <option value="C++">C++</option>
                              <option value="PHP">PHP</option>
                              <option value="HTML">HTML</option>
                              <option value="Mobile Tech">Mobile Tech</option>
                              <option value="CSS">CSS</option>
                            </select>
                          </td>
                        </tr>

                        {/*----------- 2nd choice ----------*/}
                        <tr>
                          <td className={styles.tdlblcrschoice}>
                            <label htmlFor="second_choice">
                              2nd choice
                            </label>
                          </td>
                          <td className={styles.inputtd}>
                            <select name="second_choice" id="second_choice" className={styles.reginput}>
                              <option value="Python">Python</option>
                              <option value="C">C</option>
                              <option value="C++">C++</option>
                              <option value="PHP">PHP</option>
                              <option value="HTML">HTML</option>
                              <option value="Mobile Tech">Mobile Tech</option>
                              <option value="CSS">CSS</option>
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
                            <select name="third_choice" id="third_choice" className={styles.reginput}>
                              <option value="Python">Python</option>
                              <option value="C">C</option>
                              <option value="C++">C++</option>
                              <option value="PHP">PHP</option>
                              <option value="HTML">HTML</option>
                              <option value="Mobile Tech">Mobile Tech</option>
                              <option value="CSS">CSS</option>
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
                        <td className={styles.inputlabel}>
                          {/* FRM EL #17/21 */}
                          <label htmlFor="visual_acuity">
                            Visual acuity
                          </label>
                          <span className={styles.requiredelement}>&#42;</span>
                        </td>

                        {/*-------------- VISION DROPDOWN BEGINS ------------*/}
                        <td className={styles.inputtd}>
                          {/* <Dropdown name="visual_acuity">
                            <Dropdown.Button
                              className={styles.btnregdropdown}
                              disableripple="true"
                              size="sm"
                              style={{
                                // backgroundColor below: must be RGB
                                backgroundColor: 'var(--vagreenmedium-background)',
                                height: '2em',
                                marginTop: '0.5em',
                                width: '100%'
                              }}
                              variant="shadow"  // or variant="flat"
                            >
                              {selectedValueVision}
                            </Dropdown.Button>
                            <Dropdown.Menu
                              aria-label="Single selection actions"
                              disallowEmptySelection
                              selectedKeys={selectedVision}
                              selectionMode="single"
                              onSelectionChange={setSelectedVision}
                            >
                              <Dropdown.Item key="LowVision">Low Vision</Dropdown.Item>
                              <Dropdown.Item key="Blind">Blind</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown> */}

                          <select
                            name="visual_acuity"
                            id="visual_acuity"
                            className={styles.txtboxdropdown}
                            onSelectionChange={setSelectedVision}
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
                            required
                          />
                        </td>
                      </tr>
                      <tr className={styles.regrow}>
                        <td className={styles.inputlabel}>
                          {/* FRM EL #19/21 */}
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
                            cols="20">
                          </textarea>
                        </td>
                      </tr>
                      <tr className={styles.regrow}>
                        <td className={styles.inputlabel}>
                          {/* FRM EL #20/21 (#21 is timestamp) */}
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
                          />
                        </td>
                      </tr>
                    </table>

                    {/* RESET AND SUBMIT BUTTONS 
                  NOTE: Backticks, not vertical single quotes, are required below */}
                    <div className={styles.frmbtnblocksubres}>
                      <button type="submit" aria-label="Submit form" className={`${styles.btnsubmit} ${styles.btngetsfocus}`}>SUBMIT FORM</button>
                      <button type="reset" aria-label="Reset form" className={`${styles.btnreset} ${styles.btngetsfocus}`}>RESET FORM</button>
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
