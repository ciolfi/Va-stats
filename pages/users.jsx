"use client";

import Head from 'next/head';
import Navbar from '../components/Navbar';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import React from 'react';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Table from '@/components/Table';
import Button from '@/components/Button';

export default function Page() {
  useForm();
  const { data: session, status } = useSession();
  const [dataResponse, setDataResponse] = useState([]);
  const [userResponse, setUserResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [contentLoading, setContentLoading] = useState(false);

  const [courseResponse, setCourseResponse] = useState(() => []);
  const [courseOptions1, setCourseOptions1] = useState(() => []);
  const [courseOptions2, setCourseOptions2] = useState(() => []);
  const [courseOptions3, setCourseOptions3] = useState(() => []);

  const [Option1, setOption1] = useState(() => []);
  const [Option2, setOption2] = useState(() => []);
  const [choiceChanged, setChoiceChanged] = useState(false);
  const allowedRoles = ['ADMINISTRATOR','MANAGEMENT'];

  const [editingId, setEditingId] = useState(null);

  const handleEditUser = (userID) => {
    setEditingId(userID);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const convertReactObjToArray = (object) => {
    var dataArray = [];
    object.forEach((obj) => {
      dataArray.push(obj.props['value']);
    });
    return dataArray;
  };

  const getCourseData = async () => {
    setContentLoading(true);
    const apiUrlEndpoint = `api/getcoursesdata`;
    const response = await fetch(apiUrlEndpoint);
    const res = await response.json();
    setCourseResponse(res.courses);
    setContentLoading(false);
  };

  useEffect(() => {
    getCourseData();
  }, []);

  const updateChoices = (e) => {
    const { name, value } = e.target;
    if (name === 'trainingprogram1') {
      setOption1(value);
    } else if (name === 'trainingprogram2') {
      setOption2(value);
    }
    setChoiceChanged(!choiceChanged);
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

  const handleUpdateUser = async (editedUser) => {
    setContentLoading(true);
    const response = await fetch('/api/updateusers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedUser),
    });

    if (response.ok) {
      // I had to move getpagedata out of useeffect so i could call it here
      await getPageData();
      setEditingId(null);
    } else {
      console.error('Error updating the user');
    }
    setContentLoading(false);
  };

  const handleDeleteUser = async (userID) => {
    setContentLoading(true);
    const response = await fetch('/api/deleteuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: userID }),
    });

    if (response.ok) {
      // I had to move getpagedata out of useeffect so i could call it here
      await getPageData();
    } else {
      console.error('Error deleting the batch');
    }
    setContentLoading(false);
  };

  /* ---------------------------------- API SECTION -----------------------------------*/
  const getPageData = async () => {
    setContentLoading(true);
    const apiUrlEndpoint = process.env.NEXT_PUBLIC_API_URL + `getusersdata`;
    const response = await fetch(apiUrlEndpoint);
    const res = await response.json();
    setDataResponse(res.users);
    setContentLoading(false);
  };

  useEffect(() => {
    getPageData();
  }, []);

  var result;

  /* ---------------------------------- API SECTION -----------------------------------*/
  // The /api/getuserdata below is different than the call to 'getusers';
  // this data is used to edit an INDIVIDUAL USER (note: getUserData, without an 's')
  const getUserData = async () => {
    if (!session?.user.email) {
      return;
    }
    const apiUrlEndpoint = process.env.NEXT_PUBLIC_API_URL + `getuserdata`;
    const postData = {
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: session.user.email
      }),
    };
    //console.log(postData);
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

  result = userResponse;

  const usersColumns = [
    {
      name: 'Id',
      isSticky: true,
      stickyWidth: 68,
      accessor: 'id',
    }, {
      name: 'Email',
      accessor: 'email',
    }, {
      name: 'First Name',
      accessor: 'firstname',
    }, {
      name: 'Last Name',
      accessor: 'lastname',
    }, {
      name: 'Designation',
      accessor: 'designation',
      type: 'enum',
      availableValues: ['Trainer', 'Teaching Assistant', 'Program Coordinator', 'Telecaller', 'Training Coordinator', 'Program Manager', 'Sr. Trainer', 'L & D Executive', 'Head of Training'],
    }, {
      name: 'Date of Joining',
      accessor: 'joindate',
    }, {
      name: 'Mobile Number',
      accessor: 'mobilenumber',
    }, {
      // name: 'Work Base',
      name: 'Work Location',
      accessor: 'workbase',
    }, {
      name: 'Supervisor',
      accessor: 'supervisor',
    }, {
      name: 'Nature of Job',
      accessor: 'natureofjob',
      type: 'enum',
      availableValues: ['Part time', 'Full time'],
    }, {
      name: 'Visual Acuity',
      accessor: 'visualacuity',
      type: 'enum',
      availableValues: ['Blind', 'Low Vision', 'Sighted'],
    }, {
      name: 'Training Program 1',
      accessor: 'trainingprogram1',
      type: 'enum',
      availableValues: convertReactObjToArray(courseOptions1),
    }, {
      name: 'Training Program 2',
      accessor: 'trainingprogram2',
      type: 'enum',
      availableValues: convertReactObjToArray(courseOptions1),
    }, {
      name: 'Training Program 3',
      accessor: 'trainingprogram3',
      type: 'enum',
      availableValues: convertReactObjToArray(courseOptions1),
    }, {
      name: 'Role',
      accessor: 'role',
      type: 'enum',
      availableValues: ['STAFF', 'MANAGEMENT', 'ADMINISTRATOR'],
    }, {
      name: 'Staff Working Status',
      accessor: 'isactive',
      type: 'enum',
      availableValues: ['A', 'IA'],
    }, {
      name: 'Action',
      accessor: 'action',
    },
    {
      name: 'Last Login',
      accessor: 'lastlogin',
    },
  ];

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
  } else {
    if ((allowedRoles.includes(result[0].role) && result[0].isactive === "A")) {
      return (
        <>
          <div className={styles.mynavbar}>
            <Navbar user_role={result[0].role} className={styles.navstudents} />
          </div>
          <div className={styles.container}>
            <Head>
              <title>Staff - Vision-Aid-STATS</title>
              <meta
                name='description'
                content='A nonprofit, advocating on behalf of persons with vision issues of any type' />
              <meta name='theme-color' content='#ffffff' />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <meta name="description" content="This page contains staff information and a form to add such information" />
              <link rel='icon' href='/favicon.ico' />
              <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
              <link rel='manifest' href='/manifest.json' />

              <link rel='preconnect'
                href='https://fonts.gstatic.com'
                crossOrigin="true" />
            </Head>
            <main className={styles.mainstudents}>
              {contentLoading ?
                <div className={styles.overlay}>
                  <span className={styles.customLoader}></span>
                </div>
                : <></>
              }
              <p className={styles.subtitlenonhm}>
                All VisionAid Staff

                {/* ---------- CSV Download button ---------------- */}
                <Link className={styles.csvbutton} href={"https://visionaid.dreamhosters.com/csv/staff.php"} legacyBehavior>
                  <a target="_blank" className={styles.csvbutton}><i className="fa fa-download"></i> View/Download Staff</a>
                </Link>
              </p>
              <div className={styles.gridcourses}>
              {/* <div style={{color: 'red', position: 'relative', top: '1em' }}> */}

                {/* Add staff member form */}
              {(result[0].role === 'ADMINISTRATOR') ?
                <>
                {showForm ?
                  <div className={styles.addstaffform}>                 
                    <h2 className={styles.addnewstaffmember}>Add New Staff Member &rarr;</h2><br />
                    <Image alt={'close batches form'} src={'/icons/expand-up.svg'} height={30} width={30} onClick={() => setShowForm(false)} className={styles.collapseButtonUsers} title="Close User Creation Form" />
                    <form action='/api/usercreate' className={styles.addstaffforminputs} method='post' onSubmit={() => handleSubmit()} autoComplete='off'>

                      <section className={styles.addstaffformsec1}>
                        <label htmlFor='email' className={styles.addstafflabel}>Email<span className={styles.requiredelement}>&#42;</span></label>
                        <input required type='text' id='email' name='email' className={styles.addstaffforminputsbox} autoFocus /><br /><br />

                        <label htmlFor='firstname' className={styles.addstafflabel}>First Name<span className={styles.requiredelement}>&#42;</span></label>
                        <input required type='text' className={styles.addstaffforminputsbox} id='firstname' name='firstname' /><br /><br />

                        <label htmlFor='lastname' className={styles.addstafflabel}>Last Name<span className={styles.requiredelement}>&#42;</span></label>
                        <input required type='text' className={styles.addstaffforminputsbox} id='lastname' name='lastname' /><br /><br />

                        <label htmlFor='designation' className={styles.addstafflabel}>Designation<span className={styles.requiredelement}>&#42;</span></label>
                        <select required type='text' className={styles.addstaffforminputsbox} id='designation' name='designation'>
                          <option value='Trainer' className={styles.staffformoption}>Trainer</option>
                          <option value='Teaching Assistant'>Teaching Assistant</option>
                          <option value='Program Coordinator'>Program Coordinator</option>
                          <option value='Telecaller'>Telecaller</option>
                          <option value='Training Coordinator'>Training Coordinator</option>
                          <option value='Program Manager'>Program Manager</option>
                          <option value='Sr. Trainer'>Sr. Trainer</option>
                          <option value='L & D Executive'>L & D Executive</option>
                          <option value='Head of Training'>Head of Training</option>
                        </select>
                        <br /><br />

                        <label htmlFor='joindate' className={styles.addstafflabel}>Date of Joining<span className={styles.requiredelement}>&#42;</span></label>
                        <input required type='date' className={styles.addstaffforminputsbox} id='joindate' name='joindate' />&nbsp;<br />

                        <label htmlFor='mobilenumber' className={styles.addstafflabel}>Mobile Number<span className={styles.requiredelement}>&#42;</span></label>
                        <input required type='tel' className={styles.addstaffforminputsbox} id='mobilenumber' name='mobilenumber' />&nbsp;<br />

                        <label htmlFor='workbase' className={styles.addstafflabel}>Work Location<span className={styles.requiredelement}>&#42;</span></label>
                        <input required type='text' className={styles.addstaffforminputsbox} id='workbase' name='workbase' />&nbsp;<br />
                      </section>

                      <section className={styles.addstaffformsec2}>
                        <label htmlFor='supervisor' className={styles.addstafflabel}>Supervisor<span className={styles.requiredelement}>&#42;</span></label>
                        <input required type='text' className={styles.addstaffforminputsbox} id='supervisor' name='supervisor' />&nbsp;<br />

                        <label htmlFor='natureofjob' className={styles.addstafflabel}>Nature of Job<span className={styles.requiredelement}>&#42;</span></label>
                        <select required type='text' className={styles.addstaffforminputsbox} id='natureofjob' name='natureofjob'>
                          <option value='Part time'>Part time</option>
                          <option value='Full time'>Full time</option>
                        </select>
                        <br /><br />

                        <label htmlFor='visualacuity' className={styles.addstafflabel}>Visual Acuity<span className={styles.requiredelement}>&#42;</span></label>
                        <select required type='text' className={styles.addstaffforminputsbox} id='visualacuity' name='visualacuity'>
                          <option value='Blind'>Blind</option>
                          <option value='Low Vision'>Low Vision</option>
                          <option value='Sighted'>Sighted</option>
                        </select>
                        <br /><br />

                        <label htmlFor='trainingprogram1' className={styles.addstafflabel}>Training Program 1<span className={styles.requiredelement}></span></label>
                        <select id='trainingprogram1' name='trainingprogram1' className={styles.addstaffforminputsbox} onChange={(e) => updateChoices(e)}>
                        <option></option>
                        {courseOptions1}
                        </select>&nbsp;<br />

                        <label htmlFor='trainingprogram2' className={styles.addstafflabel}>Training Program 2<span className={styles.requiredelement}></span></label>
                        <select id='trainingprogram2' name='trainingprogram2' className={styles.addstaffforminputsbox} onChange={(e) => updateChoices(e)}>
                        <option></option>
                        {courseOptions2}
                        </select>&nbsp;<br />

                        <label htmlFor='trainingprogram3' className={styles.addstafflabel}>Training Program 3<span className={styles.requiredelement}></span></label>
                        <select id='trainingprogram3' name='trainingprogram3' className={styles.addstaffforminputsbox}>
                        <option></option>
                        {courseOptions3}
                        </select>&nbsp;<br />
                      </section>

                      <section className={styles.addstaffformsec3}>
                        <label htmlFor='role' className={styles.addstafflabel}>Role<span className={styles.requiredelement}>&#42;</span></label>
                        <select required type='text' className={styles.addstaffforminputsbox} id='role' name='role'>
                          <option value='STAFF'>Staff</option>
                          <option value='MANAGEMENT'>Management</option>
                          <option value='ADMINISTRATOR'>Administrator</option>
                        </select><br /><br />

                        <label htmlFor='active' className={styles.addstafflabel}>Staff Working Status<span className={styles.requiredelement}>&#42;</span></label>
                        {/* <input required type='text' className={styles.addstaffforminputsbox} id='active' name='isactive' />&nbsp;<br /> */}
                        <select required type='text' className={styles.addstaffforminputsbox} id='active' name='isactive'>&nbsp;<br /> *
                          {/* <option value='0'>0</option>
                          <option value='1'>1</option> */}
                          <option value='A'>A</option>
                          <option value='IA'>IA</option>            
                        </select><br /><br />

                        <label htmlFor='action' className={styles.addstafflabel}>Action<span className={styles.requiredelement}></span></label>
                        <input type='text' className={styles.addstaffforminputsbox} id='action' name='action' />&nbsp;<br /><br /><br />

                        <input type='reset' value='Reset' className={styles.staffformbutton} /><br /><br /><br />
                        <button type='submit' className={styles.staffformbutton}>SUBMIT</button>

                      </section>

                    </form>
                  </div>
                  : <Button onClick={() => setShowForm(true)} text={'+ New VA Staff'}></Button>
                }
                </>
                : <></>
              }
              <Table columns={usersColumns} tableData={dataResponse} isDelete={(result[0].role == "ADMINISTRATOR")} onDeleteClick={handleDeleteUser} isEditable={(result[0].role == "ADMINISTRATOR")} onEditSave={handleUpdateUser} Title={'Staff List'} />
              </div>
            </main>
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
                  Powered by{" "}
                  <Image src='/vercel.svg'
                    alt='Vercel Logo'
                    width={72}
                    height={16} />
                </span>
              </a>
            </footer> */}
          </div>
        </>
      );

    } else {
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
  }
}
