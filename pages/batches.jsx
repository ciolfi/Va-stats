/* 
FOR LOCAL TESTING, ADJUST/COMMENT OUT SECTIONS BELOW (APPROX. LINE #'S SHOWN):
76: API endpoint reversal
111: User login analysis
214: Authentication analysis
238: Navbar role attribute
284: CSV download button attribute
404: Else block

Roster button requires also editing: 
./pages/batch/[id].jsx:
./components/Table.jsx
*/

import Head from 'next/head';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import React from 'react';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Table from '@/components/Table';
import Button from '@/components/Button';

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
    setDataResponse(res.batches);
    setContentLoading(false);
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
      stickyWidth: 67,
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
    },
    {
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
      name: 'Cost',
      accessor: 'cost',
    }, {
      name: 'Currency',
      accessor: 'currency',
      type: 'enum',
      availableValues: ['INR', 'USD'],
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
      if ((result[0].role === 'MANAGEMENT' || result[0].role === 'PM')) {
        /*------------- END LOCAL TESTING BLOCK -----------*/

        return (
          <>
            <div className={styles.mynavbar}>

              {/* LOCAL TESTING LINE: COMMENT OUT USER_ROLE FOR LOCAL TESTING BELOW */}
              <Navbar user_role={result[0].role} className={styles.navstudents} />
            </div>
            <div className={styles.container}>
              <Head>
                <title>VisionAid</title>
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
                    <a target="_blank" className={styles.csvbutton}><i className="fa fa-download"></i> Batches CSV</a>
                  </Link>
                </p>

                <div className={styles.gridcourses}>
                  {showForm ?
                    // <div className={styles.cardbatchform}>
                    <div className={styles.addbatchform}>
                      <h2>Create batch. &rarr;</h2>
                      <Image alt={'close batches form'} src={'/icons/expand-up.svg'} height={30} width={30} onClick={() => setShowForm(false)} className={styles.collapseButtonBatches} title="Close Batches Form" />
                      <form action='/api/batchcreate' method='post' onSubmit={() => handleSubmit()}>

                        <section className={styles.addbatchformsec1}>

                          <label htmlFor='coursename' className={styles.addstafflabel}>Course Name<span className={styles.requiredelement}>&#42;</span></label>
                          <select name='coursename' id='coursename' className={styles.addstaffforminputsbox} autofocus required>
                            {courseOptions}
                          </select><br /><br />

                          <label htmlFor='batch' className={styles.addstafflabel}>Batch<span className={styles.requiredelement}>&#42;</span></label>
                          <input type='text' className={styles.addstaffforminputsbox} id='batch' name='batch' required /><br /><br />

                          <label htmlFor='coursestart' className={styles.addstafflabel}>Start<span className={styles.requiredelement}>&#42;</span></label>
                          <input type='date' className={styles.addstaffforminputsbox} id='coursestart' name='coursestart' placeholder="MM/DD/YYYY" required /><br /><br />

                          <label htmlFor='courseend' className={styles.addstafflabel}>End<span className={styles.requiredelement}>&#42;</span></label>
                          <input type='date' className={styles.addstaffforminputsbox} id='courseend' name='courseend' placeholder="MM/DD/YYYY" required /><br /><br />

                          <label htmlFor='coursedays' className={styles.addstafflabel}>Days<span className={styles.requiredelement}>&#42;</span></label>
                          <span>
                            <input type='checkbox' id='M' name='coursedays' value="M" />
                            <label for='M'>M</label>
                            <input type='checkbox' id='T' name='coursedays' value="T"></input>
                            <label for='T'>T</label>
                            <input type='checkbox' id='W' name='coursedays' value="W"></input>
                            <label for='W'>W</label>
                            <input type='checkbox' id='Th' name='coursedays' value="Th"></input>
                            <label for='Th'>Th</label>
                            <input type='checkbox' id='F' name='coursedays' value="F"></input>
                            <label for='F'>F</label>
                            <input type='checkbox' id='Sa' name='coursedays' value="Sa"></input>
                            <label for='Sa'>Sa</label>
                            <input type='checkbox' id='Su' name='coursedays' value="Su"></input>
                            <label for='Su'>Su</label>
                          </span><br />

                        </section>

                        <section className={styles.addbatchformsec2}>

                          <label htmlFor='coursetimestart' className={styles.addstafflabel}>Start Time<span className={styles.requiredelement}>&#42;</span></label>
                          <input type='time' className={styles.addstaffforminputsbox} id='coursetimestart' name='coursetimestart' defaultValue='12:00' required /><br /><br />

                          <label htmlFor='coursetimeend' className={styles.addstafflabel}>End Time<span className={styles.requiredelement}>&#42;</span></label>
                          <input type='time' className={styles.addstaffforminputsbox} id='coursetimeend' name='coursetimeend' defaultValue='12:00' required /><br /><br />

                          <label htmlFor='instructor' className={styles.addstafflabel}>Instructor<span className={styles.requiredelement}>&#42;</span></label>
                          <input type='text' className={styles.addstaffforminputsbox} id='instructor' name='instructor' required /><br /><br />

                          <label htmlFor='PM' className={styles.addstafflabel}>PM<span className={styles.requiredelement}>&#42;</span></label>
                          <input type='text' className={styles.addstaffforminputsbox} id='PM' name='PM' required /><br /><br />

                          <label htmlFor='TA' className={styles.addstafflabel}>Teaching Assistant<span className={styles.requiredelement}>&#42;</span></label>
                          <input type='text' className={styles.addstaffforminputsbox} id='TA' name='TA' required /><br />

                        </section>

                        <section className={styles.addbatchformsec3}>

                          <label htmlFor='cost' className={styles.addstafflabel}>Cost<span className={styles.requiredelement}>&#42;</span></label>
                          <input type='text' className={styles.addstaffforminputsbox} id='cost' name='cost' placeholder='If free, input 0.' required /><br /><br />

                          <label htmlFor='currency' className={styles.addstafflabel}>Currency<span className={styles.requiredElement}></span>
                            <span style={{ color: 'red', paddingRight: '1em' }}>
                              &#42;&nbsp;
                            </span>
                          </label>
                          <input type="radio" id="rupees" name="currency" value="INR" />
                          <label for="rupees">INR</label>
                          <input type="radio" id="usd" name="currency" value="USD" />
                          <label for="usd">USD</label><br /><br />

                          <label htmlFor='trainingmode' className={styles.addstafflabel}>Mode of Training<span className={styles.requiredelement}>&#42;</span></label>
                          <input list='trainingmodes' className={styles.addstaffforminputsbox} id='trainingmode' name='trainingmode' required /><br /><br />
                          <datalist id="trainingmodes">
                            <option value="VIRTUAL" />
                            <option value="IN-PERSON" />
                            <option value="SELF-PACED" />
                          </datalist><br /><br />

                          <input type='reset' value='Reset' className={styles.staffformbutton} /><br /><br /><br />
                          <button type='submit' className={styles.staffformbutton}>SUBMIT</button>

                        </section>

                      </form>
                    </div>
                    : <Button onClick={() => setShowForm(true)} text={'+ New Batch Form'} className={styles.btnnewbatchform} ></Button>
                  }
                  <Table columns={batchesColumns} tableData={dataResponse} isDelete={true} onDeleteClick={handleDeleteBatch} isEditable={true} onEditSave={handleUpdateBatch} Title={'Batches List'} FilterButton={true} isBatch={true} />
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
                <title>VisionAid</title>
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
