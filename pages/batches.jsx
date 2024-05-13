/* 
EDITS HERE LIKELY REQUIRE EDITS IN THESE: 
./pages/api/batchcreate.js
./pages/api/getbatchesdata.js
./pages/api/updatebatches.js
./pages/batch/[id].jsx:
*/

import Head from 'next/head';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
// import React from 'react';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Table from '@/components/Table';
import Button from '@/components/Button';

// FOR MAPPING VALUES to dataentry dropdown
import DropdownMenuStaff from '../components/DropdownMenuStaff';

export default function Page() {
  // const res = null;
  useForm(); // Form reset
  const { data: session, status } = useSession();

  // Note: useState() is the required empty array
  const [dataResponse, setDataResponse] = useState([]);
  const [userResponse, setUserResponse] = useState([]);
  const [courseResponse, setCourseResponse] = useState(() => []);
  const [courseOptions, setCourseOptions] = useState(() => []);
  const [showForm, setShowForm] = useState(false);
  const [contentLoading, setContentLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const allowedRoles = ['ADMINISTRATOR', 'MANAGEMENT', 'STAFF'];

  const handleUpdateBatch = async (editedBatch) => {
    setContentLoading(true);
    const response = await fetch('/api/updatebatches', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedBatch),
    });

    if (response.ok) {
      // I had to move getpagedata out of useeffect so i could call it here (Spr 2023 team).
      await getPageData();
      setEditingId(null);
    } else {
      console.error('Error updating the batch');
    }
    setContentLoading(false);
  };

  const handleDeleteBatch = async (batchID) => {
    setContentLoading(true);
    const response = await fetch('/api/deletebatch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: batchID }),
    });

    if (response.ok) {
      // I had to move getpagedata out of useeffect so i could call it here (Spr 2023 team).
      await getPageData();
    } else {
      console.error('Error deleting the batch');
    }
    setContentLoading(false);
  };

  /* ---------------------------------- API SECTION -----------------------------------*/
  const getPageData = async () => {
    setContentLoading(true);
    // const apiUrlEndpoint = `https://va-stats.vercel.app/api/getbatchesdata`;
    const apiUrlEndpoint = process.env.NEXT_PUBLIC_API_URL + `getbatchesdata`;
    const response = await fetch(apiUrlEndpoint);
    const res = await response.json();
    let batchDocumentFees;
    for (const batch of res.batches) {
      batchDocumentFees = await getBatchesFeesData(batch.id);
      batch["total_students"] = batchDocumentFees.fees.length;

      let totalAmount = 0;
      if (batchDocumentFees?.fees) {
        for (const student of batchDocumentFees.fees) {
          totalAmount += student.amount_1;
          totalAmount += student.amount_2;
          totalAmount += student.amount_3;
        }
        batch["collected_fees"] = totalAmount;
      } else {
        batch["collected_fees"] = 0;
      }
    }
    setDataResponse(res.batches);
    setContentLoading(false);
  };

  const getBatchesFeesData = async (id) => {
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

    setLoading(false);
    setContentLoading(false);
    return data;
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
    setCourseOptions(options);
  };

  const [ariaExpanded, setAriaExpanded] = useState(false)

  useEffect(() => {
    getPageData();
    getCourseData();
  }, []);

  useEffect(() => {
    getCourseOptions();
  }, [courseResponse]);
  // useEffect(() => {
  //   getCourseOptions();
  // });

  /*------------- BEGIN LOCAL TESTING BLOCK -----------*/
  var result;

  const getUserData = async () => {
    // const apiUrlEndpoint = `https://va-stats.vercel.app/api/getuserdata`;
    const apiUrlEndpoint = process.env.NEXT_PUBLIC_API_URL + `getuserdata`;
    const postData = {
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: session.user.email
      }),
    };
    const response = await fetch(apiUrlEndpoint, postData);
    const res = await response.json();
    setUserResponse(res.users[0]);
    setLoading(false);
    result = res.users[0];
  };

  const handleSubmit = () => {
    setContentLoading(true);
  };

  useEffect(() => {
    getUserData();
  }, [session]);
  // useEffect(() => {
  //   getUserData();
  // });

  result = userResponse;

  if (status === 'unauthenticated') {
    return (
      <div className='autherrorcontainer'>
        <Image alt={'VisionAid logo'} src={'/images/logo-mainsite.png'} height={100} width={150} />
        <span className='autherrortext'>
          Access denied.&nbsp;
          <Link href='/' className='autherrorlink'>
            Please sign in.
          </Link>
        </span>
      </div>
    );
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  /*------------- END LOCAL TESTING BLOCK -----------*/

  const batchesColumns = [
    {
      name: 'Id',
      isSticky: true,
      stickyWidth: 68,
      accessor: 'id',
    }, {
      name: 'Name',
      accessor: 'coursename',
    }, {
      name: 'Batch',
      accessor: 'batch',
    }, {
      name: 'Start',
      accessor: 'coursestart',
    }, {
      name: 'End',
      accessor: 'courseend',
    }, {
      name: 'Days',
      accessor: 'coursedays',
    }, {
      name: 'Times',
      accessor: 'coursetimes',
    }, {
      name: 'Instructor',
      accessor: 'instructor',
    }, {
      name: 'PM',
      accessor: 'PM',
    }, {
      name: 'TA',
      accessor: 'TA',
    }, {
      name: 'Data Entry Access',
      accessor: 'dataentry',
      // type: 'enum',
      // availableValues: ['NO', 'YES'],
    }, {
      name: 'Status',
      accessor: 'status',
      type: 'enum',
      availableValues: ['UNSTARTED', 'ONGOING', 'COMPLETE'],
    }, {
      name: 'Training Mode',
      accessor: 'trainingmode',
      type: 'enum',
      availableValues: ['VIRTUAL', 'IN-PERSON', 'SELF-PACED'],
    }, {
      name: 'Collected Fees',
      accessor: 'collected_fees',
    }, {
      name: 'Currency',
      accessor: 'currency',
      type: 'enum',
      availableValues: ['INR', 'USD'],
    }, {
      name: 'Enrollment',
      accessor: 'total_students',
    },

  ];

  /*------------- BEGIN LOCAL TESTING BLOCK -----------*/
  if (status === 'authenticated' || status === 'unauthenticated') {
    if ((result.length === 0)) {
      return (
        <div className='autherrorcontainer'>
          <Image alt={'VisionAid logo'} src={'/images/logo-mainsite.png'} height={100} width={150} />
          <span className='autherrortext'>
            Not authorized.&nbsp;
            <Link href='/' className='autherrorlink'>
              Please try another account.
            </Link>
          </span>
        </div>
      );
    }
    else {
      if (allowedRoles.includes(result[0].role)) {
        /*------------- END LOCAL TESTING BLOCK -----------*/

        return (
          <>
            <div className={styles.mynavbar}>

              {/* LOCAL TESTING LINE: COMMENT OUT USER_ROLE FOR LOCAL TESTING BELOW */}
              <Navbar user_role={result[0].role} className={styles.navstudents} />
            </div>
            <div className={styles.container}>
              <Head>
                <title>Batches - Vision-Aid-STATS</title>
                <meta
                  name='description'
                  content='A nonprofit, advocating on behalf of persons with vision issues of any type' />
                <meta name='theme-color' content='#ffffff' />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
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

              <main className={styles.mainstudents}>
                {contentLoading ?
                  <div className={styles.overlay}>
                    <span className={styles.customLoader}></span>
                  </div>
                  : <></>
                }
                <p className={styles.subtitlenonhm}>
                  Batch Management

                  {/* LOCAL TESTING LINE BELOW: ADD 'legacyBehavior' ATTRIB FOR LOCAL TESTING */}
                  {/* ---------- CSV Download button ---------------- */}
                  <Link legacyBehavior className={styles.csvbutton} href={"https://visionaid.dreamhosters.com/csv/batches.php"}>
                    {/* <Link legacyBehavior className={styles.csvbutton} href={"https://visionaid.dreamhosters.com/csv"}> */}
                    <a target="_blank" className={styles.csvbutton}><i className="fa fa-download"></i> View/Download Batches</a>
                  </Link>
                </p>

                <div className={styles.gridcourses}>
                  {showForm ?
                    // <div className={styles.cardbatchform}>
                    <div className={styles.addbatchform} id="createNewBatch">
                      <div>
                        <h2>Create batch. &rarr;</h2>
                        <Image alt={'close batches form'} src={'/icons/expand-up.svg'} height={30} width={30}
                          onClick={() => {
                            setAriaExpanded(false)
                            setShowForm(false)
                          }}
                          className={styles.collapseButtonBatches} title="Close Batches Form" />

                      </div>

                      <div id="requiredHelper" tabindex="0"><h4>The fields marked with asterisks  (*) are Required</h4></div>
                      <div>
                        <form action='/api/batchcreate' method='post' onSubmit={() => handleSubmit()}>
                          <section className={styles.addbatchformsec1}>

                            <label htmlFor='coursename' className={styles.addstafflabel}>Course Name<span className={styles.requiredelement}>&#42;</span></label>
                            <select name='coursename' id='coursename' className={styles.addstaffforminputsbox} autoFocus required>
                              {courseOptions}
                            </select><br /><br />

                            <label htmlFor='batch' className={styles.addstafflabel}>Batch ID<span className={styles.requiredelement}>&#42;</span></label>
                            <input type='text' className={styles.addstaffforminputsbox} id='batch' name='batch' required /><br /><br />

                            <label htmlFor='coursestart' className={styles.addstafflabel}>Course Start Date<span className={styles.requiredelement}>&#42;</span></label>
                            <input type='date' className={styles.addstaffforminputsbox} id='coursestart' name='coursestart' placeholder="MM/DD/YYYY" required /><br /><br />

                            <label htmlFor='courseend' className={styles.addstafflabel}>Course End Date<span className={styles.requiredelement}>&#42;</span></label>
                            <input type='date' className={styles.addstaffforminputsbox} id='courseend' name='courseend' placeholder="MM/DD/YYYY" required /><br /><br />

                            {/* <label htmlFor='coursedays' className={styles.addstafflabel} tabIndex="0">Select Class Days<span className={styles.requiredelement}>&#42;</span></label>
                            <span>
                              <input type='checkbox' aria-label="Monday" id='M' name='coursedays' value="M" />
                              <label htmlFor='M'>M</label>
                              <input type='checkbox' aria-label="Tuesday" id='T' name='coursedays' value="T"></input>
                              <label htmlFor='T'>T</label>
                              <input type='checkbox' aria-label="Wednesday" id='W' name='coursedays' value="W"></input>
                              <label htmlFor='W'>W</label>
                              <input type='checkbox' aria-label="Thursday" id='Th' name='coursedays' value="Th"></input>
                              <label htmlFor='Th'>Th</label>
                              <input type='checkbox' id='F' aria-label="Friday" name='coursedays' value="F"></input>
                              <label htmlFor='F'>F</label>
                              <input type='checkbox' aria-label="Saturday" id='Sa' name='coursedays' value="Sa"></input>
                              <label htmlFor='Sa'>Sa</label>
                              <input type='checkbox' aria-label="Sunday" id='Su' name='coursedays' value="Su"></input>
                              <label htmlFor='Su'>Su</label>
                            </span><br /> */}

                            {/* ------------- CHECKBOXES BEGIN --------------- */}
                            {/* <div class="wrapper-checkboxes">
                              <label htmlFor='coursedays' className={styles.addstafflabel} tabIndex="0">Select Class Days<span className={styles.requiredelement}>&#42;</span></label> */}
                            {/* <div class="wrapper-checkboxes"> */}
                            {/* <div class="container-checkboxes">
                                  <span class="checkBox">
                                    <input class="input-days" title="checkbox-mon" type="checkbox" />
                                    <label class="label-days">Monday</label>
                                  </span>
                                  <span class="checkBox">
                                    <input class="input-days" title="checkbox-tue" type="checkbox" />
                                    <label class="label-days">Tuesday</label>
                                  </span>
                                  <span class="checkBox">
                                    <input class="input-days" title="checkbox-wed" type="checkbox" />
                                    <label class="label-days">Wednesday</label>
                                  </span>
                                  <span class="checkBox">
                                    <input class="input-days" title="checkbox-thu" type="checkbox" />
                                    <label class="label-days">Thursday</label>
                                  </span>
                                  <span class="checkBox">
                                    <input class="input-days" title="checkbox-fri" type="checkbox" />
                                    <label class="label-days">Friday</label>
                                  </span>
                                  <span class="checkBox">
                                    <input class="input-days" title="checkbox-sat" type="checkbox" />
                                    <label class="label-days">Saturday</label>
                                  </span>
                                  <span class="checkBox">
                                    <input class="input-days" title="checkbox-sun" type="checkbox" />
                                    <label class="label-days">Sunday</label>
                                  </span>
                              </div> */}
                            {/* </div> */}
                            <div className={styles.wrappercheckboxes}>
                              <label htmlFor='coursedays' className={styles.addcheckboxeslabel} tabIndex="0">Select Class Days<span className={styles.requiredelement}>&#42;</span></label>
                              <div className={styles.containercheckboxes}>
                                <span className={styles.checkBox}>
                                  <input className={styles.inputdays} type='checkbox' aria-label="Monday" id='M' name='coursedays' value="M" />
                                  <label className={styles.labeldays} htmlFor='M'>M</label>
                                </span>

                                <span className={styles.checkBox}>
                                  <input className={styles.inputdays} type='checkbox' aria-label="Tuesday" id='T' name='coursedays' value="T"></input>
                                  <label className={styles.labeldays} htmlFor='T'>T</label>
                                </span>

                                <span className={styles.checkBox}>
                                  <input  className={styles.inputdays} type='checkbox' aria-label="Wednesday" id='W' name='coursedays' value="W"></input>
                                  <label className={styles.labeldays} htmlFor='W'>W</label>
                                </span>

                                <span className={styles.checkBox}>
                                  <input className={styles.inputdays} type='checkbox' aria-label="Thursday" id='Th' name='coursedays' value="Th"></input>
                                  <label className={styles.labeldays} htmlFor='Th'>Th</label>
                                </span>

                                <span className={styles.checkBox}>
                                  <input className={styles.inputdays} type='checkbox' id='F' aria-label="Friday" name='coursedays' value="F"></input>
                                  <label className={styles.labeldays} htmlFor='F'>F</label>
                                </span>

                                <span className={styles.checkBox}>
                                  <input className={styles.inputdays} type='checkbox' aria-label="Saturday" id='Sa' name='coursedays' value="Sa"></input>
                                  <label className={styles.labeldays} htmlFor='Sa'>Sa</label>
                                </span>

                                <span className={styles.checkBox}>
                                  <input className={styles.inputdays} type='checkbox' aria-label="Sunday" id='Su' name='coursedays' value="Su"></input>
                                  <label className={styles.labeldays} htmlFor='Su'>Su</label>
                                </span>
                              </div>
                            </div>
                            <br />

                            {/* ------------- CHECKBOXES END --------------- */}

                          </section>

                          <section className={styles.addbatchformsec2}>

                            <label htmlFor='coursetimestart' className={styles.addstafflabel}>Class Start Time<span className={styles.requiredelement}>&#42;</span></label>
                            <input type='time' className={styles.addstaffforminputsbox} id='coursetimestart' name='coursetimestart' defaultValue='12:00' required /><br /><br />

                            <label htmlFor='coursetimeend' className={styles.addstafflabel}>Class End Time<span className={styles.requiredelement}>&#42;</span></label>
                            <input type='time' className={styles.addstaffforminputsbox} id='coursetimeend' name='coursetimeend' defaultValue='12:00' required /><br /><br />

                            <label htmlFor='instructor' className={styles.addstafflabel}>Instructor<span className={styles.requiredelement}>&#42;</span></label>
                            <input type='text' className={styles.addstaffforminputsbox} id='instructor' name='instructor' required /><br /><br />

                            <label htmlFor='PM' className={styles.addstafflabel}>Program Manager<span className={styles.requiredelement}>&#42;</span></label>
                            <DropdownMenuStaff
                              id='PM'
                              name='PM'
                              required
                            /><br /><br />

                            <label htmlFor='TA' className={styles.addstafflabel}>Teaching Assistant<span className={styles.requiredelement}>&#42;</span></label>
                            <input type='text' className={styles.addstaffforminputsbox} id='TA' name='TA' required /><br /><br />

                            <label htmlFor='dataentry' className={styles.addstafflabel}>Data Entry Access<span className={styles.requiredelement}>&#42;</span></label>
                            <DropdownMenuStaff
                              id='dataentry'
                              name='dataentry'
                              required
                            />
                          </section>

                          <section className={styles.addbatchformsec3}>

                            <label htmlFor='cost' className={styles.addstafflabel}>Cost per Student<span className={styles.requiredelement}>&#42;</span></label>
                            <input type='text' className={styles.addstaffforminputsbox} id='cost' name='cost' placeholder='If free, input 0.' required /><br /><br />

                            <label htmlFor='currency' className={styles.addstafflabel}>Currency<span className={styles.requiredElement}></span>
                              <span style={{ color: 'red', paddingRight: '1em' }}>
                                &#42;&nbsp;
                              </span>
                            </label>

                            <input type="radio" id="rupees" name="currency" value="INR" />
                            <label htmlFor="rupees" aria-label='Select Rupee as Currency'>INR</label>

                            <input type="radio" id="usd" name="currency" value="USD" />
                            <label htmlFor="usd" aria-label='Select Dollar as Currency'>USD</label>

                            <br /><br />

                            <label htmlFor='strength' className={styles.addstafflabel}>Batch Strength<span className={styles.requiredelement}>&#42;</span></label>
                            <input type='text' className={styles.addstaffforminputsbox} id='strength' name='strength' required /><br /><br />

                            <label htmlFor='trainingmode' className={styles.addstafflabel}>Mode of Training<span className={styles.requiredelement}>&#42;</span></label>
                            <input list='trainingmodes' className={styles.addstaffforminputsbox} id='trainingmode' name='trainingmode' required /><br /><br />
                            <datalist id="trainingmodes">
                              <option value="VIRTUAL" />
                              <option value="IN-PERSON" />
                              <option value="SELF-PACED" />
                            </datalist><br />

                            <input type='reset' value='Reset' className={styles.staffformbutton} /><br /><br />
                            <button type='submit' className={styles.staffformbutton}>SUBMIT</button>

                          </section>

                        </form>
                      </div>
                    </div>
                    : ''
                  }
                  <Button style={{ display: showForm ? 'none' : 'block' }} onClick={() => {
                    setAriaExpanded(true)
                    setShowForm(true)
                  }} text={'Create New Batch'} className={styles.btnnewbatchform} ariaExpanded={ariaExpanded} ariaControls='createNewBatch'></Button>
                  <Table columns={batchesColumns} tableData={dataResponse} isDelete={(userResponse[0]["role"] != "STAFF")} onDeleteClick={handleDeleteBatch} isEditable={(userResponse[0]["role"] != "STAFF")} onEditSave={handleUpdateBatch} Title={'Batches List'} FilterButton={true} isBatch={true} />
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

              </main >
            </div >
          </>
        );
      }

      /*------------- BEGIN LOCAL TESTING BLOCK ------------*/
      else {
        return (
          <>
            <div className={styles.mynavbar}>
              <Navbar className={styles.navstudents} />
            </div>
            <div className={styles.container}>
              <Head>
                <title>Batch Management-Vision-Aid</title>
                <meta
                  name='description'
                  content='A nonprofit, advocating on behalf of persons with vision issues of any type' />
                <meta name='theme-color' content='#ffffff' />
                <link rel='icon' href='/favicon.ico' />
                <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
                <link rel='manifest' href='/manifest.json' />
                <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin="true" />

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

              <main className={styles.mainstudents}>
                <p className={styles.subtitlenonhm}>
                  Batch Management
                </p>

                <div className={styles.gridcourses}>
                  {/* <Table columns={batchesColumns} tableData={dataResponse} Title={'Batches List'} /> */}
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
              </main>
            </div>
          </>
        );
      }
    }
  }
}
/*------------- END LOCAL TESTING BLOCK ------------*/
