'use client';
import styles from "../styles/TestReg.module.css";
import React from "react";
import Head from 'next/head';

// Dropdowns: gender, 1st choice, 2nd choice, 3rd choice, visual acuity
//import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
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

  // 1st course choice
  const [selectedFirstChoice, setSelectedFirst] = React.useState(new Set(["1st choice"]));
  const selectedValueFirst = React.useMemo(
    () => Array.from(selectedFirstChoice).join(", ").replaceAll("_", " "),
    [selectedFirstChoice]
  );

  // 2nd course choice
  const [selectedSecondChoice, setSelectedSecond] = React.useState(new Set(["2nd choice"]));
  const selectedValueSecond = React.useMemo(
    () => Array.from(selectedSecondChoice).join(", ").replaceAll("_", " "),
    [selectedSecondChoice]
  );

  // 3rd course choice
  const [selectedThirdChoice, setSelectedThird] = React.useState(new Set(["3rd choice"]));
  const selectedValueThird = React.useMemo(
    () => Array.from(selectedThirdChoice).join(", ").replaceAll("_", " "),
    [selectedThirdChoice]
  );

  const [selectedVision, setSelectedVision] = React.useState(new Set(["Choose vision"]));
  const selectedValueVision = React.useMemo(
    () => Array.from(selectedVision).join(", ").replaceAll("_", " "),
    [selectedVision]
  );

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
                      <td className={styles.inputtd}><input type="textbox" required className={styles.reginput} /></td>
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
                      <td className={styles.inputtd}><input type="textbox" required className={styles.reginput}
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

                {/* COURSE CHOICES SUBFORM BEGINS */}
                <table className={styles.tblchoosecourses}>
                  <tbody>
                    <tr>
                      <td className={styles.tdcolfirstchoice}><input type="textbox" className={styles.inputcrschoice}
                        placeholder="1st choice"
                      /></td>
                      <td className={styles.tdcolsecondchoice}><input type="textbox" className={styles.inputcrschoice}
                        placeholder="2nd choice"
                      /></td>
                      <td className={styles.tdcolthirdchoice}><input type="textbox" className={styles.inputcrschoice}
                        placeholder="3rd choice"
                      /></td>
                    </tr>
                    <tr>
                      <td className={styles.tdcolfirstchoice}><input type="submit" className={styles.btnsubmitcrschoice}
                        value="Add 1st choice"
                      /></td>
                      <td className={styles.tdcolsecondchoice}><input type="submit" className={styles.btnsubmitcrschoice}
                        value="Add 2nd choice"
                      /></td>
                      <td className={styles.tdcolthirdchoice} ><input type="submit" className={styles.btnsubmitcrschoice}
                        value="Add 3rd choice"
                      /></td>
                    </tr>
                  </tbody>
                </table>

                {/* Must use backtick, not vertical single quote */}
                <button aria-label="Reset form" className={`${styles.btncrsesresetdark} ${styles.btngetsfocus}`}>Reset Courses</button>

                {/* Courses worksheet */}
                <table className={styles.tblcoursewksht}>
                  <caption className={styles.capcoursewksht}>
                    <h3 className={styles.h3courses}>Courses worksheet</h3>
                    <span className={styles.coursestip}>
                      Tip: After tab selects first course, use up/down keys to navigate; tab to exit worksheet section.
                    </span>
                  </caption>
                  <thead>
                    <tr>
                      <th></th><th>Name</th><th>Abbreviation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={styles.regrow}>
                      <td className={styles.inputtd}><input type="radio" name="vacourse" value="" className={styles.btnradiocourse} /></td>
                      <td className={styles.inputlabelcourses}>
                        Spoken English – Beginners
                      </td>
                      <td className={styles.tblcrsabbrev}>EngBegin</td>
                    </tr>
                    <tr className={styles.regrow}>
                      <td className={styles.inputtd}><input type="radio" name="vacourse" value="" className={styles.btnradiocourse} /></td>
                      <td className={styles.inputlabelcourses}>
                        Mobile Technologies
                      </td>
                      <td className={styles.tblcrsabbrev}>MobileTech</td>
                    </tr>
                    <tr className={styles.regrow}>
                      <td className={styles.inputtd}><input type="radio" name="vacourse" value="" className={styles.btnradiocourse} /></td>
                      <td className={styles.inputlabelcourses}>
                        Certificate Course in Computer Applications(CCA)
                      </td>
                      <td className={styles.tblcrsabbrev}>CertCca</td>
                    </tr>
                    <tr className={styles.regrow}>
                      <td className={styles.inputtd}><input type="radio" name="vacourse" value="" className={styles.btnradiocourse} /></td>
                      <td className={styles.inputlabelcourses}>
                        Basic Braille
                      </td>
                      <td className={styles.tblcrsabbrev}>BasicBraille</td>
                    </tr>
                    {/* <tr className={styles.regrow}>
                    <td className={styles.inputtd}><input type="checkbox" className={styles.btnradiocourse} /></td>
                    <td className={styles.inputlabelcourses}>
                      Job Coaching for Banking and other exams
                    </td>
                  </tr>
                  <tr className={styles.regrow}>
                    <td className={styles.inputtd}><input type="checkbox" className={styles.btnradiocourse} /></td>
                    <td className={styles.inputlabelcourses}>
                      Excel
                    </td>
                  </tr>
                  <tr className={styles.regrow}>
                    <td className={styles.inputtd}><input type="checkbox" className={styles.btnradiocourse} /></td>
                    <td className={styles.inputlabelcourses}>
                      Spoken English - Intermediate Level
                    </td>
                  </tr>
                  <tr className={styles.regrow}>
                    <td className={styles.inputtd}><input type="checkbox" className={styles.btnradiocourse} /></td>
                    <td className={styles.inputlabelcourses}>
                      Digital Accessibility Testing
                    </td>
                  </tr>

                  <tr className={styles.regrow}>
                    <td className={styles.inputtd}><input type="checkbox" className={styles.btnradiocourse} /></td>
                    <td className={styles.inputlabelcourses}>
                      Corporate Skills Development
                    </td>
                  </tr>
                  <tr className={styles.regrow}>
                    <td className={styles.inputtd}><input type="checkbox" className={styles.btnradiocourse} /></td>
                    <td className={styles.inputlabelcourses}>
                      Python
                    </td>
                  </tr>
                  <tr className={styles.regrow}>
                    <td className={styles.inputtd}><input type="checkbox" className={styles.btnradiocourse} /></td>
                    <td className={styles.inputlabelcourses}>
                      HTML, CSS, JavaScript, and ARIA Fundamentals for Accessible Web Development
                    </td>
                  </tr>
                  <tr className={styles.regrow}>
                    <td className={styles.inputtd}><input type="checkbox" className={styles.btnradiocourse} /></td>
                    <td className={styles.inputlabelcourses}>
                      Diploma Course in Computer Applications (DCA)
                    </td>
                  </tr>
                  <tr className={styles.regrow}>
                    <td className={styles.inputtd}><input type="checkbox" className={styles.btnradiocourse} /></td>
                    <td className={styles.inputlabelcourses}>
                      Life Skills
                    </td>
                  </tr>
                  <tr className={styles.regrow}>
                    <td className={styles.inputtd}><input type="checkbox" className={styles.btnradiocourse} /></td>
                    <td className={styles.inputlabelcourses}>
                      Rights of Persons with Disabilities
                    </td>
                  </tr>
                  <tr className={styles.regrow}>
                    <td className={styles.inputtd}><input type="checkbox" className={styles.btnradiocourse} /></td>
                    <td className={styles.inputlabelcourses}>
                      Android: Low-Vision Series
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.inputtd}><input type="checkbox" className={styles.checkboxcourses} /></td>
                    <td className={styles.inputlabelcourses}>
                      Listen with Talkback series
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3" className={styles.tblcoursesfoot}>
                      * The checkboxes are only for your convenience. Check the box for your top three course choices. Then, use the dropdowns above to select your top three. Only your dropdown menu choices will be submitted when you submit the form (not checks from the checkboxes). Note: the course abbreviation is entered as your choice.
                    </td>
                  </tr>
                </tfoot> */}

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
                    <td className={styles.inputtd}><input type="textbox" required className={styles.reginput} /></td>
                  </tr>
                  <tr className={styles.regrow}>
                    <td className={styles.inputlabel}>
                      Vision impairment history (brief; feel free to leave it empty)
                    </td>
                    <td className={styles.inputtd}><input type="textbox" placeholder='300-char max' className={styles.reginput} /></td>
                  </tr>
                  <tr className={styles.regrow}>
                    <td className={styles.inputlabel}>
                      How you found us (e.g., Internet)
                    </td>
                    <td className={styles.inputtd}><input type="textbox" className={styles.reginput} /></td>
                  </tr>

                  {/* <tr>
                  <td className={styles.tdregformbtns} colSpan="2">
                    <button aria-label="Submit form" className={styles.btnsubmit}>SUBMIT FORM</button>
                    <button aria-label="Reset form" className={styles.btnreset}>RESET FORM</button>                   
                  </td>
                </tr> */}
                </table>

                {/* RESET AND SUBMIT BUTTONS */}

                {/* EXAMPLE:
              className={`${styles.btncrsesresetdark} ${styles.btngetsfocus}`} */}

                <button aria-label="Submit form" className={`${styles.btnsubmit} ${styles.btngetsfocus}`}>SUBMIT FORM</button>
                <button aria-label="Reset form" className={`${styles.btnreset} ${styles.btngetsfocus}`}>RESET FORM</button>

              </div>
              {/*--------- MISCELLANEOUS CARD ENDS --------*/}

            </div>
          </form>
        </div>
      </main>
    </>
  );
}
