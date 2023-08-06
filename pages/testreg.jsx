'use client';
import styles from "../styles/TestReg.module.css";
import React from "react";
import Head from 'next/head';
import { Button } from "@nextui-org/react";
import { useState } from 'react';

// Dropdowns (gender, visual acuity) and 
// button (1st choice, 2nd choice, 3rd choice)
// import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { Dropdown } from "@nextui-org/react";

export default function Home() {

  // GENDER DROPDOWN
  const [selectedGender, setSelectedGender] = React.useState(new Set(["Gender/Other"]));
  const selectedValueGender = React.useMemo(
    () => Array.from(selectedGender).join(", ").replaceAll("_", " "),
    [selectedGender]
  );

  // EMPLOYMENT STATUS  DROPDOWN
  const [selectedEmpStatus, setSelectedEmpStatus] = React.useState(new Set(["Employment"]));
  const selectedValueEmpStatus = React.useMemo(
    () => Array.from(selectedEmpStatus).join(", ").replaceAll("_", " "),
    [selectedEmpStatus]
  );

  // // 1st course choice
  // const [selectedFirstChoice, setSelectedFirst] = React.useState(new Set(["1st choice"]));
  // const selectedValueFirst = React.useMemo(
  //   () => Array.from(selectedFirstChoice).join(", ").replaceAll("_", " "),
  //   [selectedFirstChoice]
  // );

  // // 2nd course choice
  // const [selectedSecondChoice, setSelectedSecond] = React.useState(new Set(["2nd choice"]));
  // const selectedValueSecond = React.useMemo(
  //   () => Array.from(selectedSecondChoice).join(", ").replaceAll("_", " "),
  //   [selectedSecondChoice]
  // );

  // // 3rd course choice
  // const [selectedThirdChoice, setSelectedThird] = React.useState(new Set(["3rd choice"]));
  // const selectedValueThird = React.useMemo(
  //   () => Array.from(selectedThirdChoice).join(", ").replaceAll("_", " "),
  //   [selectedThirdChoice]
  // );

  const [selectedVision, setSelectedVision] = React.useState(new Set(["Choose vision"]));
  const selectedValueVision = React.useMemo(
    () => Array.from(selectedVision).join(", ").replaceAll("_", " "),
    [selectedVision]
  );

  // function addFirstChoice() {
  //   var chosencourse = document.getElementsByName('vacourse');
  //   for (let i = 0; i < chosencourse.length; i++) {
  //     if (chosencourse[i].checked) {
  //       var selecttextbox = document.getElementById("textboxfirstchoice");
  //       selecttextbox.value = chosencourse[i].value;
  //     }
  //   }
  // }

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
      }
    }
  }

  return (
    <>
      <Head>
        <title>Student Registration</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.title}>
          Student Registration
        </div>
        <div>
          <form suppressHydrationWarning >
            <div className={styles.grid}>

              {/*----- TRAINEE/TRAINER BEGINS -------*/}
              <div
                className={styles.card}
              >
                <h2>
                  Trainee/Trainer
                </h2>
                <table className={styles.regtable}>
                  <thead>
                    <tr></tr>
                  </thead>
                  <tbody>
                    <tr className={styles.regrow}>
                      <td className={styles.inputlabel}>
                        Email
                        <span className={styles.requiredelement}>&#42;</span>
                      </td>
                      <td className={styles.inputtd}><input type="textbox" required className={styles.reginput} /></td>
                    </tr>
                    <tr className={styles.regrow}>
                      <td className={styles.inputlabel}>
                        Name
                        <span className={styles.requiredelement}>&#42;</span>
                      </td>
                      <td className={styles.inputtd}>
                        <input
                          placeholder="Firstname Lastname"
                          type="textbox"
                          required className={styles.reginput}
                        />
                      </td>
                    </tr>
                    <tr className={styles.regrow}>
                      <td className={styles.inputlabel}>
                        Phone
                        <span className={styles.requiredelement}>&#42;</span>
                      </td>
                      <td className={styles.inputtd}>
                        <input
                          className={styles.reginput}
                          id='phone_number'
                          maxLength="10"
                          name='phone_number'
                          placeholder='10 num only; no dashes'
                          type='textbox'
                          required
                        // value={value}
                        // onChange={handleChange}
                        // onBlur={checkConstraints}
                        />
                      </td>
                    </tr>
                    <tr className={styles.regrow}>
                      <td className={styles.inputlabel}>
                        Alt. Phone
                      </td>
                      <td className={styles.inputtd}><input type="textbox" className={styles.reginput} /></td>
                    </tr>
                    <tr className={styles.regrow} >
                      <td className={styles.inputlabel}>
                        City
                        <span className={styles.requiredelement}>&#42;</span>
                      </td>
                      <td className={styles.inputtd}><input type="textbox" className={styles.reginput} /></td>
                    </tr>
                    <tr className={styles.regrow}>
                      <td className={styles.inputlabel}>
                        State
                        <span className={styles.requiredelement}>&#42;</span>
                      </td>
                      <td className={styles.inputtd}><input type="textbox" className={styles.reginput} /></td>
                    </tr>

                    {/*---------- GENDER DROPDOWN BEGINS -----*/}
                    <tr className={styles.regrow}>
                      <td className={styles.inputlabel}>
                        Gender
                        <span className={styles.requiredelement}>&#42;</span>
                      </td>
                      <td className={styles.inputtd}>
                        <Dropdown>
                          <Dropdown.Button
                            disableripple
                            size="sm"
                            style={{
                              // backgroundColor below: must be RGB
                              backgroundColor: 'var(--vagreenmedium-background)',
                              height: '2em',
                              marginTop: '0.5em',
                              width: '100%'
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
                            <Dropdown.Item key="Female" isSelected>Female</Dropdown.Item>
                            <Dropdown.Item key="Male">Male</Dropdown.Item>
                            <Dropdown.Item key="Other">Other</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                    {/*---------- GENDER DROPDOWN BEGINS -----*/}

                    {/* Birthdate picker */}
                    <tr className={styles.regrow}>
                      <td className={styles.inputlabel}>
                        Birthdate
                        <span className={styles.requiredelement}>&#42;</span>
                      </td>
                      <td className={styles.inputtd}>
                        <input type="date" id="birthdaytime" name="birthdaytime" className={styles.reginput} />
                      </td>
                    </tr>

                    <tr className={styles.regrow}>
                      <td className={styles.inputlabel}>
                        Education
                        <span className={styles.requiredelement}>&#42;</span>
                      </td>
                      <td className={styles.inputtd}><input type="textbox" required className={styles.reginput}
                        placeholder="Degrees, etc, 300-char max"
                      />
                      </td>
                    </tr>

                    {/*---- EMPLOYMENT STATUS DROPDOWN BEGINS -----*/}
                    <tr className={styles.regrow}>
                      <td className={styles.inputlabel}>
                        Employment status
                        <span className={styles.requiredelement}>&#42;</span>
                      </td>
                      <td className={styles.inputtd}>
                        <Dropdown>
                          <Dropdown.Button
                            disableripple
                            size="sm"
                            style={{
                              // backgroundColor below: must be RGB
                              backgroundColor: 'var(--vagreenmedium-background)',
                              height: '2em',
                              marginTop: '0.5em',
                              width: '100%'
                            }}
                            variant="shadow"
                          >
                            {selectedValueEmpStatus}
                          </Dropdown.Button>
                          <Dropdown.Menu
                            aria-label="Single selection actions"
                            disallowEmptySelection
                            selectionMode="single"
                            selectedKeys={selectedEmpStatus}
                            onSelectionChange={setSelectedEmpStatus}
                          >
                            <Dropdown.Item key="Employed" isSelected>Employed</Dropdown.Item>
                            <Dropdown.Item key="Unemployed">Unemployed</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                    {/*---- EMPLOYMENT STATUS DROPDOWN ENDS -----*/}

                    <tr className={styles.regrow}>
                      <td className={styles.inputlabel}>
                        Learning goal(s)
                        <span className={styles.requiredelement}>&#42;</span>
                      </td>
                      <td className={styles.inputtd}><input type="textbox" required className={styles.reginput}
                        placeholder="300-char max"
                      />
                      </td>
                    </tr>
                    <tr className={styles.regrow}>
                      <td className={styles.inputlabel}>
                        Trainer name
                      </td>
                      <td className={styles.inputtd}>
                        <input
                          className={styles.reginput}
                          placeholder="Firstname Lastname"
                          type="textbox"
                          required
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/*---------- CARD: TRAINEE/TRAINER ENDS --------*/}

              {/*-------------CARD: COURSES BEGINS ------------*/}
              <div
                className={styles.card}
              >
                <h2>
                  Choose courses
                </h2>
                <div className={styles.coursestip}>
                  <ol>
                    <li>Choose course from list.</li>
                    <li>Use <em>Add 1st choice</em> button.</li>
                    <li>Course abbreviation is added to box.</li>
                    <li>Repeat for 2nd and 3rd choices.</li>
                  </ol>
                </div>

                {/* COURSE CHOICES SUBFORM BEGINS */}
                <table className={styles.tblchoosecourses}>
                  <tr>
                    <td className={styles.tdlblcrschoice}>
                      <label>First choice</label>
                    </td>
                    <td className={styles.tdtextboxcrschoice}>
                      <input
                        className={styles.inputcrschoice}
                        id="textboxfirstchoice"
                        placeholder="1st choice"
                        type="text"
                      />
                    </td>
                    <td className={styles.tdsubmitcrschoice}>
                      <button type="button" id="submitcrschoicefirst" onClick={() => addCourseChoice("firstchoice")} className={styles.btnsubmitcrschoice}>
                        Add 1st choice
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.tdlblcrschoice}>
                      <label>Second choice</label>
                    </td>
                    <td className={styles.tdtextboxcrschoice}>
                      <input
                        className={styles.inputcrschoice}
                        id="textboxsecondchoice"
                        placeholder="2nd choice"
                        type="text"
                      />
                    </td>
                    <td className={styles.tdsubmitcrschoice}>
                      <button type="button" id="submitcrschoicesecond" onClick={() => addCourseChoice("secondchoice")} className={styles.btnsubmitcrschoice}>
                        Add 2nd choice
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.tdlblcrschoice}>
                      <label>Third choice</label>
                    </td>
                    <td className={styles.tdtextboxcrschoice}>
                      <input
                        className={styles.inputcrschoice}
                        id="textboxthirdchoice"
                        placeholder="3rd choice"
                        type="text"
                      />
                    </td>
                    <td className={styles.tdsubmitcrschoice}>
                      <input type="submit" id="submitcrschoicethird" className={styles.btnsubmitcrschoice}
                        value="Add 3rd choice" />
                    </td>
                  </tr>
                </table>

                {/* Must use backtick for multiple classes, not vertical single quote */}
                <button
                  aria-label="Reset form"
                  className={`${styles.btncrsesresetdark} ${styles.btngetsfocus}`}
                  type="reset"
                >
                  Reset Courses
                </button>

                {/* Courses worksheet */}
                <table className={styles.tblcoursewksht}>
                  <thead>
                    <tr>
                      <th></th><th>Name</th><th>Abbreviation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={styles.regrow}>
                      <td className={styles.inputtd}>
                        <input type="radio" name="vacourse" value="EngBegin" className={styles.btnradiocourse} />
                      </td>
                      <td className={styles.inputlabelcourses}>
                        Spoken English – Beginners
                      </td>
                      <td className={styles.tblcrsabbrev}>EngBegin</td>
                    </tr>
                    <tr className={styles.regrow}>
                      <td className={styles.inputtd}><input type="radio" name="vacourse" value="MobileTech" className={styles.btnradiocourse} /></td>
                      <td className={styles.inputlabelcourses}>
                        Mobile Technologies
                      </td>
                      <td className={styles.tblcrsabbrev}>MobileTech</td>
                    </tr>
                    <tr className={styles.regrow}>
                      <td className={styles.inputtd}><input type="radio" name="vacourse" value="CertCca" className={styles.btnradiocourse} /></td>
                      <td className={styles.inputlabelcourses}>
                        Certificate Course in Computer Applications(CCA)
                      </td>
                      <td className={styles.tblcrsabbrev}>CertCca</td>
                    </tr>
                    <tr className={styles.regrow}>
                      <td className={styles.inputtd}><input type="radio" name="vacourse" value="BasicBraille" className={styles.btnradiocourse} /></td>
                      <td className={styles.inputlabelcourses}>
                        Basic Braille
                      </td>
                      <td className={styles.tblcrsabbrev}>BasicBraille</td>
                    </tr>
                    <tr className={styles.regrow}>
                      <td className={styles.inputtd}><input type="radio" name="vacourse" value="JobCoaching" className={styles.btnradiocourse} /></td>
                      <td className={styles.inputlabelcourses}>
                        Job Coaching for Banking and other exams
                      </td>
                      <td className={styles.tblcrsabbrev}>JobCoaching</td>
                    </tr>
                    <tr className={styles.regrow}>
                      <td className={styles.inputtd}><input type="radio" name="vacourse" value="Excel" className={styles.btnradiocourse} /></td>
                      <td className={styles.inputlabelcourses}>
                        Excel
                      </td>
                      <td className={styles.tblcrsabbrev}>Excel</td>
                    </tr>
                    <tr className={styles.regrow}>
                      <td className={styles.inputtd}><input type="radio" name="vacourse" value="EngInter" className={styles.btnradiocourse} /></td>
                      <td className={styles.inputlabelcourses}>
                        Spoken English - Intermediate Level
                      </td>
                      <td className={styles.tblcrsabbrev}>EngInter</td>
                    </tr>
                    <tr className={styles.regrow}>
                      <td className={styles.inputtd}><input type="radio" name="vacourse" value="DigAccTesting" className={styles.btnradiocourse} /></td>
                      <td className={styles.inputlabelcourses}>
                        Digital Accessibility Testing
                      </td>
                      <td className={styles.tblcrsabbrev}>DigAccTesting</td>
                    </tr>

                    <tr className={styles.regrow}>
                      <td className={styles.inputtd}><input type="radio" name="vacourse" value="CorpSkills" className={styles.btnradiocourse} /></td>
                      <td className={styles.inputlabelcourses}>
                        Corporate Skills Development
                      </td>
                      <td className={styles.tblcrsabbrev}>CorpSkills</td>
                    </tr>
                    <tr className={styles.regrow}>
                      <td className={styles.inputtd}><input type="radio" name="vacourse" value="Python" className={styles.btnradiocourse} /></td>
                      <td className={styles.inputlabelcourses}>
                        Python
                      </td>
                      <td className={styles.tblcrsabbrev}>Python</td>
                    </tr>
                    <tr className={styles.regrow}>
                      <td className={styles.inputtd}><input type="radio" name="vacourse" value="WebARIA" className={styles.btnradiocourse} /></td>
                      <td className={styles.inputlabelcourses}>
                        HTML, CSS, JavaScript, and ARIA Fundamentals for Accessible Web Development
                      </td>
                      <td className={styles.tblcrsabbrev}>WebARIA</td>
                    </tr>
                    <tr className={styles.regrow}>
                      <td className={styles.inputtd}><input type="radio" name="vacourse" value="DiplomaDCA" className={styles.btnradiocourse} /></td>
                      <td className={styles.inputlabelcourses}>
                        Diploma Course in Computer Applications (DCA)
                      </td>
                      <td className={styles.tblcrsabbrev}>DiplomaDCA</td>
                    </tr>
                    <tr className={styles.regrow}>
                      <td className={styles.inputtd}><input type="radio" name="vacourse" value="LifeSkills" className={styles.btnradiocourse} /></td>
                      <td className={styles.inputlabelcourses}>
                        Life Skills
                      </td>
                      <td className={styles.tblcrsabbrev}>LifeSkills</td>
                    </tr>
                    <tr className={styles.regrow}>
                      <td className={styles.inputtd}><input type="radio" name="vacourse" value="RightsPWD" className={styles.btnradiocourse} /></td>
                      <td className={styles.inputlabelcourses}>
                        Rights of Persons with Disabilities
                      </td>
                      <td className={styles.tblcrsabbrev}>RightsPWD</td>
                    </tr>
                    <tr className={styles.regrow}>
                      <td className={styles.inputtd}><input type="radio" name="vacourse" value="AndroidLowVis" className={styles.btnradiocourse} /></td>
                      <td className={styles.inputlabelcourses}>
                        Android: Low-Vision Series
                      </td>
                      <td className={styles.tblcrsabbrev}>AndroidLowvis</td>
                    </tr>
                    <tr>
                      <td className={styles.inputtd}><input type="radio" name="vacourse" value="TalkbackSeries" className={styles.checkboxcourses} /></td>
                      <td className={styles.inputlabelcourses}>
                        Listen with Talkback series
                      </td>
                      <td className={styles.tblcrsabbrev}>TalkbackSeries</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/*------------- COURSES END -------------*/}

              {/*--------- MISCELLANEOUS CARD BEGINS --------*/}
              <div className={styles.card}>
                <h2>
                  Miscellaneous
                </h2>
                <table className={styles.tblmisc}>

                  <tr className={styles.regrow}>
                    <td className={styles.inputlabel}>
                      Visual acuity
                      <span className={styles.requiredelement}>&#42;</span>
                    </td>

                    {/*-------------- VISION DROPDOWN BEGINS ------------*/}
                    <td className={styles.inputtd}>
                      <Dropdown>
                        <Dropdown.Button
                          className={styles.btnregdropdown}
                          disableripple
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
                          // color="secondary"
                          disallowEmptySelection
                          selectionMode="single"
                          selectedKeys={selectedVision}
                          onSelectionChange={setSelectedVision}
                        >
                          <Dropdown.Item key="LowVision">Low Vision</Dropdown.Item>
                          <Dropdown.Item key="Blind">Blind</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                    {/*--------------- VISION DROPDOWN ENDS ---------------*/}
                  </tr>

                  <tr className={styles.regrow}>
                    <td className={styles.inputlabel}>
                      Percent of vision loss
                      <span className={styles.requiredelement}>&#42;</span>
                    </td>
                    <td className={styles.inputtd}>
                      <input
                        className={styles.reginput}
                        placeholder="1-99"
                        type="textbox"
                        required
                      />
                    </td>
                  </tr>
                  <tr className={styles.regrow}>
                    <td className={styles.inputlabel}>
                      Vision impairment history (brief; feel free to leave it empty)
                    </td>
                    <td className={styles.inputtd}><input type="textbox" placeholder='300-char max' className={styles.reginput} /></td>
                  </tr>
                  <tr className={styles.regrow}>
                    <td className={styles.inputlabel}>
                      How you found us
                    </td>
                    <td className={styles.inputtd}>
                      <input
                        className={styles.reginput}
                        placeholder="Internet, friend, etc."
                        type="textbox"
                      />
                    </td>
                  </tr>

                  {/* <tr>
                  <td className={styles.tdregformbtns} colSpan="2">
                    <button aria-label="Submit form" className={styles.btnsubmit}>SUBMIT FORM</button>
                    <button aria-label="Reset form" className={styles.btnreset}>RESET FORM</button>                   
                  </td>
                </tr> */}
                </table>

                {/* RESET AND SUBMIT BUTTONS 
                NOTE: Backticks, not vertical single quotes, are required below */}
                <div className={styles.frmbtnblocksubres}>
                  <button aria-label="Submit form" className={`${styles.btnsubmit} ${styles.btngetsfocus}`}>SUBMIT FORM</button>
                  <button aria-label="Reset form" className={`${styles.btnreset} ${styles.btngetsfocus}`}>RESET FORM</button>
                </div>

              </div>
              {/*--------- MISCELLANEOUS CARD ENDS --------*/}

            </div>
          </form>
        </div>
      </main>
    </>
  );
}
