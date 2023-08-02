'use client';
import styles from "../styles/TestReg.module.css";
import React from "react";

// Hydration error
// import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic'

// Dropdowns: gender, 1st choice, 2nd choice, 3rd choice, visual acuity
// import {  Button, Dropdown,  DropdownTrigger,  DropdownMenu,  DropdownItem } from "@nextui-org/react";

export default function Home() {
  // For hydration error
  // const NoSSR = dynamic(() => import('Button', 'Dropdown', 'DropdownTrigger', 'DropdownItem', 'DropdownMenu'), { ssr: false });

  // GENDER DROPDOWN
  const [selectedGender, setSelectedGender] = React.useState(new Set(["Gender/Other"]));
  const selectedValueGender = React.useMemo(
    () => Array.from(selectedGender).join(", ").replaceAll("_", " "),
    [selectedGender]
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

  // Vision dropdown
  const [selectedVision, setSelectedVision] = React.useState(new Set(["Choose vision"]));
  const selectedValueVision = React.useMemo(
    () => Array.from(selectedVision).join(", ").replaceAll("_", " "),
    [selectedVision]
  );

  return (
    <main className={styles.main}>
      <div className={styles.title}>
        Student Registration
      </div>
      <div>
        <form suppressHydrationWarning >
          <div className={styles.grid}>

            {/*---------- TRAINEE/TRAINER BEGINS --------*/}
            <div
              className={styles.card}
            >
              <h2>
                Trainee/Trainer
              </h2>
              <table className={styles.regtable}>
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
                    City/State
                    <span className={styles.requiredelement}>&#42;</span>
                  </td>
                  <td className={styles.inputtd}><input type="textbox" className={styles.reginput} /></td>
                </tr>
                <tr className={styles.regrow} >
                  <td className={styles.inputlabel}>
                    City
                    <span className={styles.requiredelement}>&#42;</span>
                  </td>
                  <td className={styles.inputtd}>(NOT AVAILABLE)</td>
                </tr>
                <tr className={styles.regrow}>
                  <td className={styles.inputlabel}>
                    State
                    <span className={styles.requiredelement}>&#42;</span>
                  </td>
                  <td className={styles.inputtd}>(NOT AVAILABLE)</td>
                </tr>

                {/*--------------- GENDER DROPDOWN BEGINS ---------------*/}
                <tr className={styles.regrow}>
                  <td className={styles.inputlabel}>
                    Gender
                    <span className={styles.requiredelement}>&#42;</span>
                  </td>
                  <td className={styles.inputtd}>
                    {/* <Dropdown backdrop="blur">
                      <DropdownTrigger>
                        <Button
                          className={styles.btnlightgender}
                          size="sm"
                          variant="bordered"
                        >
                          {selectedValueGender}
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        aria-label="Single selection actions"
                        backdrop="white"
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={selectedGender}
                        onSelectionChange={setSelectedGender}
                        color="primary"
                        variant="shadow"
                        width="3em"
                      >
                        <DropdownItem key="Female">Female</DropdownItem>
                        <DropdownItem key="Male">Male</DropdownItem>
                        <DropdownItem key="Other">Other</DropdownItem>
                      </DropdownMenu>
                    </Dropdown> */}
                  </td>
                </tr>
                {/*--------------- GENDER DROPDOWN ENDS ---------------*/}

                {/*------------ BIRTHDATE DATE PICKER BEGINS ----------*/}
                <tr className={styles.regrow}>
                  <td className={styles.inputlabel}>
                    Birthdate
                    <span className={styles.requiredelement}>&#42;</span>
                  </td>
                  <td className={styles.inputtd}>
                    <input type="date" id="birthdaytime" name="birthdaytime" />
                  </td>
                </tr>
                {/*------------ BIRTHDATE DATE PICKER ENDS -------------*/}

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
                  <td className={styles.inputtd}>(NOT AVAILABLE)</td>
                </tr>
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
              <table>
                <tr>
                  <td className={styles.tdtablecoursechoices} colSpan="3">
                    <table className={styles.tablecoursechoices}>
                      <tr>

                        {/* DROPDOWN: FIRST CHOICE
                        <td className={styles.tdfirstchoice}>
                          <Dropdown>
                            <Dropdown.Trigger>
                              <Dropdown.Button
                                className={styles.btnregdropdown}
                                size="sm"
                              >
                                {selectedValueFirst}
                              </Dropdown.Button>
                            </Dropdown.Trigger>
                            <Dropdown.Menu
                              aria-label="Single selection actions"
                              color="secondary"
                              // color="black"
                              disallowEmptySelection
                              selectionMode="single"
                              selectedKeys={selectedFirstChoice}
                              onSelectionChange={setSelectedFirst}
                            >
                              <Dropdown.Item key="EngBegin">Spoken English – Beginners</Dropdown.Item>
                              <Dropdown.Item key="MobileTech">Mobile Technologies</Dropdown.Item>
                              <Dropdown.Item key="CertCca">Certificate Course in Computer Applications(CCA)</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>

                        {/* DROPDOWN: SECOND CHOICE
                        <td className={styles.tdsecondchoice}>
                          <Dropdown>
                            <Dropdown.Trigger>
                              <Dropdown.Button
                                className={styles.btnregdropdown}
                                size="sm"
                              >
                                {selectedValueSecond}
                              </Dropdown.Button>
                            </Dropdown.Trigger>
                            <Dropdown.Menu
                              aria-label="Single selection actions"
                              color="secondary"
                              // color="black"
                              disallowEmptySelection
                              selectionMode="single"
                              selectedKeys={selectedSecondChoice}
                              onSelectionChange={setSelectedSecond}
                            >
                              <Dropdown.Item key="EngBegin">Spoken English – Beginners</Dropdown.Item>
                              <Dropdown.Item key="MobileTech">Mobile Technologies</Dropdown.Item>
                              <Dropdown.Item key="CertCca">Certificate Course in Computer Applications(CCA)</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>

                        {/* DROPDOWN: THIRD CHOICE
                        <td className={styles.tdthirdchoice}>
                          <Dropdown>
                            <Dropdown.Trigger>
                              <Dropdown.Button
                                className={styles.btnregdropdown}
                                size="sm" 
                              >
                                {selectedValueThird}
                              </Dropdown.Button>
                            </Dropdown.Trigger>
                            <Dropdown.Menu
                              aria-label="Single selection actions"
                              color="secondary"
                              // color="black"
                              disallowEmptySelection
                              selectionMode="single"
                              selectedKeys={selectedThirdChoice}
                              onSelectionChange={setSelectedThird}
                            >
                              <Dropdown.Item key="EngBegin">Spoken English – Beginners</Dropdown.Item>
                              <Dropdown.Item key="MobileTech">Mobile Technologies</Dropdown.Item>
                              <Dropdown.Item key="CertCca">Certificate Course in Computer Applications(CCA)</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td> */}

                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              {/* Courses worksheet */}
              <table className={styles.tblcoursewksht}>
                <caption className={styles.capcoursewksht}><h3>Courses worksheet*</h3></caption>
                <thead>
                  <tr>
                    <th></th><th>Name</th><th>Abbreviation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={styles.regrow}>
                    <td className={styles.inputtd}><input type="checkbox" className={styles.checkboxcourse} /></td>
                    <td className={styles.inputlabelcourses}>
                      Spoken English – Beginners
                    </td>
                    <td className={styles.tblcrsabbrev}>EngBegin</td>
                  </tr>
                  <tr className={styles.regrow}>
                    <td className={styles.inputtd}><input type="checkbox" className={styles.checkboxcourse} /></td>
                    <td className={styles.inputlabelcourses}>
                      Mobile Technologies
                    </td>
                    <td className={styles.tblcrsabbrev}>MobileTech</td>
                  </tr>
                  <tr className={styles.regrow}>
                    <td className={styles.inputtd}><input type="checkbox" className={styles.checkboxcourse} /></td>
                    <td className={styles.inputlabelcourses}>
                      Certificate Course in Computer Applications(CCA)
                    </td>
                    <td className={styles.tblcrsabbrev}>CertCca</td>
                  </tr>
                  {/* <tr className={styles.regrow}>
                    <td className={styles.inputtd}><input type="checkbox" className={styles.checkboxcourse} /></td>
                    <td className={styles.inputlabelcourses}>
                      Basic Braille
                    </td>
                  </tr>
                  <tr className={styles.regrow}>
                    <td className={styles.inputtd}><input type="checkbox" className={styles.checkboxcourse} /></td>
                    <td className={styles.inputlabelcourses}>
                      Job Coaching for Banking and other exams
                    </td>
                  </tr>
                  <tr className={styles.regrow}>
                    <td className={styles.inputtd}><input type="checkbox" className={styles.checkboxcourse} /></td>
                    <td className={styles.inputlabelcourses}>
                      Excel
                    </td>
                  </tr>
                  <tr className={styles.regrow}>
                    <td className={styles.inputtd}><input type="checkbox" className={styles.checkboxcourse} /></td>
                    <td className={styles.inputlabelcourses}>
                      Spoken English - Intermediate Level
                    </td>
                  </tr>
                  <tr className={styles.regrow}>
                    <td className={styles.inputtd}><input type="checkbox" className={styles.checkboxcourse} /></td>
                    <td className={styles.inputlabelcourses}>
                      Digital Accessibility Testing
                    </td>
                  </tr>

                  <tr className={styles.regrow}>
                    <td className={styles.inputtd}><input type="checkbox" className={styles.checkboxcourse} /></td>
                    <td className={styles.inputlabelcourses}>
                      Corporate Skills Development
                    </td>
                  </tr>
                  <tr className={styles.regrow}>
                    <td className={styles.inputtd}><input type="checkbox" className={styles.checkboxcourse} /></td>
                    <td className={styles.inputlabelcourses}>
                      Python
                    </td>
                  </tr>
                  <tr className={styles.regrow}>
                    <td className={styles.inputtd}><input type="checkbox" className={styles.checkboxcourse} /></td>
                    <td className={styles.inputlabelcourses}>
                      HTML, CSS, JavaScript, and ARIA Fundamentals for Accessible Web Development
                    </td>
                  </tr>
                  <tr className={styles.regrow}>
                    <td className={styles.inputtd}><input type="checkbox" className={styles.checkboxcourse} /></td>
                    <td className={styles.inputlabelcourses}>
                      Diploma Course in Computer Applications (DCA)
                    </td>
                  </tr>
                  <tr className={styles.regrow}>
                    <td className={styles.inputtd}><input type="checkbox" className={styles.checkboxcourse} /></td>
                    <td className={styles.inputlabelcourses}>
                      Life Skills
                    </td>
                  </tr>
                  <tr className={styles.regrow}>
                    <td className={styles.inputtd}><input type="checkbox" className={styles.checkboxcourse} /></td>
                    <td className={styles.inputlabelcourses}>
                      Rights of Persons with Disabilities
                    </td>
                  </tr>
                  <tr className={styles.regrow}>
                    <td className={styles.inputtd}><input type="checkbox" className={styles.checkboxcourse} /></td>
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
              <table>
                
                <tr className={styles.regrow}>
                  <td className={styles.inputlabel}>
                    Visual acuity (blind or low vision)
                    <span className={styles.requiredelement}>&#42;</span>
                  </td>

                  {/*-------------- VISION DROPDOWN BEGINS ------------
                  <td className={styles.inputtd}>
                    <Dropdown>
                      <Dropdown.Trigger>
                        <Dropdown.Button
                          className={styles.btnregdropdown}
                          size="sm"
                        >
                          {selectedValueVision}
                        </Dropdown.Button>
                      </Dropdown.Trigger>
                      <Dropdown.Menu
                        aria-label="Single selection actions"
                        color="secondary"
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={selectedVision}
                        onSelectionChange={setSelectedVision}
                      >
                        <Dropdown.Item key="LowVision">Low Vision</Dropdown.Item>
                        <Dropdown.Item key="Blind">Blind</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td> */}
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
                    Usable vision (acuity, field)
                  </td>
                  <td className={styles.inputtd}><input type="textbox" className={styles.reginput} /></td>
                </tr>
                <tr className={styles.regrow}>
                  <td className={styles.inputlabel}>
                    Vision impairment history (brief)
                  </td>
                  <td className={styles.inputtd}><input type="textbox" placeholder='300-char max' className={styles.reginput} /></td>
                </tr>
                <tr className={styles.regrow}>
                  <td className={styles.inputlabel}>
                    How you found us (e.g., Internet)
                  </td>
                  <td className={styles.inputtd}><input type="textbox" className={styles.reginput} /></td>
                </tr>
                
                {/* RESET AND SUBMIT BUTTONS */}
                <tr>
                  <td className={styles.tdregformbtns} colSpan="2">
                    <button aria-label="Reset form" className={styles.btnlight}>Reset</button>
                    <button aria-label="Submit form" className={styles.btndark}>Submit</button>          
                  </td>
                </tr>
              </table>
            </div>
            {/*--------- MISCELLANEOUS CARD ENDS --------*/}

          </div>
        </form>
      </div>
    </main>
  );
}
