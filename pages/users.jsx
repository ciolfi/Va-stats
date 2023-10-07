/* When host is changed: Change values in
'API SECTIONS' below */

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

  const [editingId, setEditingId] = useState(null);

  const handleEditUser = (userID) => {
    setEditingId(userID);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

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
    // const apiUrlEndpoint = `https://va-stats.vercel.app/api/getusersdata`;
    // const apiUrlEndpoint = `http://localhost:3000/api/getusersdata`;
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
  const getUserData = async () => {
    // const apiUrlEndpoint = `https://va-stats.vercel.app/api/getuserdata`;
    //const apiUrlEndpoint = `http://localhost:3000/api/getuserdata`;
    // NOTE DIFFERENCE FROM ABOVE ENDPOINT: here, it's '...user...' without the 's'
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

  // useEffect(() => {
  //   getUserData();
  // });

  result = userResponse;


  if (loading) {
    return <p>Loading...</p>;
  }

  const usersColumns = [
    {
      name: 'Id',
      width: '6%',
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
      name: 'Role',
      accessor: 'role',
      type: 'enum',
      availableValues: ['MANAGEMENT', 'PM', 'ADMINISTRATOR'],
    }, {
      name: 'Active',
      accessor: 'isactive',
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
  } else {
    if ((result[0].role === 'MANAGEMENT' && result[0].isactive === 1)) {
      return (
        <>
          <div className={styles.mynavbar}>
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
                All VisionAid Staff

                {/* ---------- CSV Download button ---------------- */}
                <Link className={styles.csvbutton} href={"https://visionaid.dreamhosters.com/csv/staff.php"} legacyBehavior>
                  {/* <Link className={styles.csvbutton} href={"https://visionaid.dreamhosters.com/csv"} legacyBehavior> */}
                  <a target="_blank" className={styles.csvbutton}>Staff CSV</a>
                </Link>
              </p>
              <div className={styles.gridcourses}>

                {/* Add staff member form */}
                {showForm ?
                  // <div className={styles.cardcoursesform}>
                  <div className={styles.addstaffform}>
                    <h2 class={styles.addnewstaffmember}>Add New Staff Member &rarr;</h2><br />
                    <Image alt={'close batches form'} src={'/icons/expand-up.svg'} height={30} width={30} onClick={() => setShowForm(false)} className={styles.collapseButtonUsers} title="Close User Creation Form" />
                    <form action='/api/usercreate' className={styles.addstaffforminputs} method='post' onSubmit={() => handleSubmit()}>
                      <label htmlFor='id' className={styles.addstafflabel}>VisionAid User ID<span className={styles.requiredelement}>&#42;</span></label>
                      <input type='text' id='id' name='id' required className={styles.addstaffforminputsbox} /><br /><br />

                      <label htmlFor='email' className={styles.addstafflabel}>Email<span className={styles.requiredelement}>&#42;</span></label>
                      <input type='text' id='email' name='email' required className={styles.addstaffforminputsbox} /><br /><br />

                      <label htmlFor='firstname' className={styles.addstafflabel}>First Name<span className={styles.requiredelement}>&#42;</span></label>
                      <input type='text' className={styles.addstaffforminputsbox} id='firstname' name='firstname' required /><br /><br />

                      <label htmlFor='lastname' className={styles.addstafflabel}>Last Name<span className={styles.requiredelement}>&#42;</span></label>
                      <input type='text' className={styles.addstaffforminputsbox}id='lastname' name='lastname' required /><br /><br />

                      {/* NEW */}
                      <label htmlFor='designation' className={styles.addstafflabel}>Designation<span className={styles.requiredelement}>&#42;</span></label>
                      <select type='text' className={styles.addstaffforminputsbox}id='designation' name='designation' required >
                        <option value='trainer'>Trainer</option>
                        <option value='teachingassistant'>Teaching Assistant</option>
                        <option value='programcoordinator'>Program Coordinator</option>
                        <option value='telecaller'>Telecaller</option>
                        <option value='trainingcoordinator'>Training Coordinator</option>
                        <option value='programmanager'>Program Manager</option>
                        <option value='srtrainer'>Sr. Trainer</option>
                        <option value='ldexecutive'>L & D Executive</option>
                        <option value='headoftraining'>Head of Training</option>
                      </select>
                      <br /><br />

                      {/* NEW */}
                      <label htmlFor='joindate' className={styles.addstafflabel}>Date of Joining<span className={styles.requiredelement}>&#42;</span></label>
                      <input type='date' className={styles.addstaffforminputsbox} id='joindate' name='joindate' required />&nbsp;<br />

                      {/* NEW */}
                      <label htmlFor='mobilenumber' className={styles.addstafflabel}>Mobile Number<span className={styles.requiredelement}>&#42;</span></label>
                      <input type='tel' className={styles.addstaffforminputsbox} id='mobilenumber' name='mobilenumber' required />&nbsp;<br />

                      {/* NEW */}
                      <label htmlFor='workbase' className={styles.addstafflabel}>Work Base<span className={styles.requiredelement}>&#42;</span></label>
                      <input type='text' className={styles.addstaffforminputsbox} id='workbase' name='workbase' required />&nbsp;<br />

                      {/* NEW */}
                      <label htmlFor='supervisor' className={styles.addstafflabel}>Supervisor<span className={styles.requiredelement}>&#42;</span></label>
                      <input type='text' className={styles.addstaffforminputsbox} id='supervisor' name='supervisor' required />&nbsp;<br />

                      {/* NEW */}
                      <label htmlFor='natureofjob' className={styles.addstafflabel}>Nature of Job<span className={styles.requiredelement}>&#42;</span></label>
                      <select type='text' className={styles.addstaffforminputsbox} id='natureofjob' name='natureofjob' required >
                        <option value='parttime'>Part time</option>
                        <option value='fulltime'>Full time</option>
                      </select>
                      <br /><br />

                      {/* NEW */}
                      <label htmlFor='visualacuity' className={styles.addstafflabel}>Visual Acuity<span className={styles.requiredelement}>&#42;</span></label>
                      <select type='text' className={styles.addstaffforminputsbox} id='visualacuity' name='visualacuity' required >
                        <option value='blind'>Blind</option>
                        <option value='lowvision'>Low Vision</option>
                        <option value='sighted'>Sighted</option>
                      </select>
                      <br /><br />

                      {/* NEW */}
                      <label htmlFor='trainingprogram1' className={styles.addstafflabel}>Training Program 1<span className={styles.requiredelement}>&#42;</span></label>
                      <input type='text' className={styles.addstaffforminputsbox} id='trainingprogram1' name='trainingprogram1' required />&nbsp;<br />

                      {/* NEW */}
                      <label htmlFor='trainingprogram2' className={styles.addstafflabel}>Training Program 2<span className={styles.requiredelement}>&#42;</span></label>
                      <input type='text' className={styles.addstaffforminputsbox} id='trainingprogram2' name='trainingprogram2' required />&nbsp;<br />

                      {/* NEW */}
                      <label htmlFor='trainingprogram3' className={styles.addstafflabel}>Training Program 3<span className={styles.requiredelement}>&#42;</span></label>
                      <input type='text' className={styles.addstaffforminputsbox} id='trainingprogram3' name='trainingprogram3' required />&nbsp;<br />

                      {/* Changed options wording; switched to dropdown */}
                      {/* <label htmlFor='role' className={styles.addstafflabel}>Role<span className={styles.requiredelement}>&#42;</span></label>
                      <input list='roles' className={styles.addstaffforminputsbox} id='role' name='role' required /><br /><br />
                      <datalist id='roles'>
                        <option value='Staff' />
                        <option value='Management' />
                        <option value='Administrator' />
                      </datalist> */}

                      <label htmlFor='role' className={styles.addstafflabel}>Role<span className={styles.requiredelement}>&#42;</span></label>
                      <select type='text' className={styles.addstaffforminputsbox} id='role' name='role' required>
                        <option value='staff'>Staff</option>
                        <option value='management'>Management</option>
                        <option value='administrator'>Administrator</option>
                      </select><br /><br />

                      {/* NEW */}
                      <label htmlFor='active' className={styles.addstafflabel}>Active<span className={styles.requiredelement}>&#42;</span></label>
                      <input type='text' className={styles.addstaffforminputsbox} id='active' name='active' required />&nbsp;<br />

                      {/* NEW */}
                      <label htmlFor='action' className={styles.addstafflabel}>Action<span className={styles.requiredelement}>&#42;</span></label>
                      <input type='text' className={styles.addstaffforminputsbox} id='action' name='action' required />&nbsp;<br /><br /><br />

                      <button type='submit' className={styles.staffformbutton}>Submit</button>&nbsp;&nbsp;
                      <input type='reset' value='RESET' className={styles.staffformbutton} />
                    </form>
                  </div>
                  : <Button onClick={() => setShowForm(true)} text={'+ New VA Staff'}></Button>
                }
                <Table columns={usersColumns} tableData={dataResponse} isDelete={true} onDeleteClick={handleDeleteUser} isEditable={true} onEditSave={handleUpdateUser} Title={'Staff List'} />
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
}
