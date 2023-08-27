/* This page registers a new student;
usually done by a project manager */

// SUN 8/13 AM CODE

// import Navbar from '../components/Navbar';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../components/Navbar.jsx';
import styles from '../styles/Home.module.css';
import React from 'react';
// import { useSession } from 'next-auth/react';                  /* COMMENT REMOVES SECURITY FOR THIS PAGE */
import { useForm } from 'react-hook-form'; // Form reset
import Head from 'next/head';
import { useState } from 'react';

// import { Button } from './components/Button.jsx';

// POPUP CODE
import Router from "next/router";

export default function Page() {
  useForm(); // Form reset
  // const { data: session, status } = useSession();           /* COMMENT REMOVES SECURITY FOR THIS PAGE */
  // Note: useState() is the required empty array
  const [dataResponse, setDataResponse] = useState([]);
  const [userResponse, setUserResponse] = useState([]);
  const [contentLoading, setContentLoading] = useState(false);

  // POPUP CODE 
  const [route, setRoute] = useState();

  const handleSubmit = () => {
    // POPUP CODE
    alert("Registration successful.");

    setContentLoading(true);

    // POPUP CODE 
    Router.push("https://va-stats.vercel.app/students", { shallow: true });
    // Router.push("https://va-stats.vercel.app/studentregistration", { shallow: true });
  };

  // if (status === 'loading') {
  //     return <p>Loading...</p>;
  // }

  // Phone number constraints BEGIN
  const [value, setValue] = useState('');
  const handleChange = event => {
    const result = event.target.value.replace(/\D/g, '');
    setValue(result);
  };
  const checkConstraints = event => {
    const result = event.target.value;
    if (result.length !== 10) {
      alert("The phone number should be 10 numbers.");
      document.getElementById("phnum").value = null;
    }
  };
  // Phone number constraints END

  return (
    <>
      <div className={styles.container}>

        {contentLoading ?
          <div className={styles.overlay}>
            <span className={styles.customLoader}></span>
          </div>
          : <></>
        }
        <div className={styles.mynavbar}>
          <Navbar className={styles.navstudents} />
        </div>
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

          {/* <link rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin="true" /> */}

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

        <div className={styles.studentapplicationform}>
          <h2>Student Application Form &rarr;</h2><br />
          {/* Form inputs: (14) */}
          <form action='/api/studentapplication' method='post' onSubmit={() => handleSubmit()}>
            <label htmlFor='email'>Email:<span className={styles.requiredelement}>&#42;</span></label>
            <input type='text' id='email' name='email' required /><br /><br />

            <label htmlFor='name'>Name:<span className={styles.requiredelement}>&#42;</span></label>
            <input type='text' id='name' name='name' required /><br /><br />

            {/* <label htmlFor='phone_number'>Phone Number:<span className={styles.requiredelement}>&#42;</span></label>
                    <input type='text' id='phone_number' name='phone_number' required maxlength="10" pattern="[0]{1}[0-9]{9}"/>&nbsp;(10 numerical characters with no dashes or special characters)<br /><br /> */}

            <label htmlFor='phone_number'>Phone Number:<span className={styles.requiredelement}>&#42;</span></label>
            {/* <input id='phone_number' name='phone_number' required type="text" inputmode="numeric" pattern="\d*" />&nbsp;(10 numerical characters with no dashes or special characters)<br /><br /> */}

            {/* Phone textbox constraints */}
            <input
              id='phone_number'
              maxLength="10"
              name='phone_number'
              // placeholder="Phone number"
              type='text'
              required
              value={value}
              onChange={handleChange}
              onBlur={checkConstraints}
            />&nbsp;(10 numerical characters; no dashes or special characters)<br /><br />

            <label htmlFor='alt_ph_num'>Alternate Phone Number:<span className={styles.requiredelement}></span></label>
            <input type='int' id='alt_ph_num' name='alt_ph_num' /><br /><br />

            <label htmlFor='gender'>Gender:<span className={styles.requiredelement}>&#42;</span></label>
            <input list='genders' id='gender' name='gender' required /><br /><br />
            <datalist id="genders">
              <option value="M" />
              <option value="F" />
              <option value="Other" />
            </datalist>

            <label htmlFor='age'>Birth Date:<span className={styles.requiredelement}>&#42;</span></label>
            {/* <input type='date' id='age' name='age' placeholder='MM/DD/YYYY' required /><br /><br /> */}
            <input type='date' id='age' name='age' required />&nbsp;<br /><br />

            <label htmlFor='edu_qualifications'>Education qualifications:<span className={styles.requiredelement}>&#42;</span></label>
            <input type='text' id='edu_qualifications' name='edu_qualifications' required /><br /><br />

            <label htmlFor='courses'>What courses are you interested in? Go to the Courses page for a list of available courses.<span className={styles.requiredelement}>&#42;</span></label>
            <input type='text' id='courses' name='courses' required /><br /><br />

            <label htmlFor='location'>What city and state are you from?<span className={styles.requiredelement}>&#42;</span></label>
            <input type='text' id='location' name='location' required /><br /><br />

            <label htmlFor='objectives' className={styles.nonrequiredelement}>What are your long term learning objectives?</label>
            <input type='text' id='objectives' name='objectives' /><br /><br />

            <label htmlFor='vision_impairment' className={styles.nonrequiredelement}>Provide a brief history of your vision impairment.</label>
            <input type='text' id='vision_impairment' name='vision_impairment' /><br /><br />

            <label htmlFor='usable_vision' className={styles.nonrequiredelement}>What is your usable vision in terms of acuity and field?</label>
            <input type='text' id='usable_vision' name='usable_vision' /><br /><br />

            <label htmlFor='total_vision_loss'>What is the percentage of vision loss?<span className={styles.requiredelement}>&#42;</span></label>
            <input type='text' id='total_vision_loss' name='total_vision_loss' required /><br /><br />

            <label htmlFor='source'>How did you hear about the program?<span className={styles.requiredelement}>&#42;</span></label>
            <input type='text' id='source' name='source' required /><br /><br />

            {/* <button
            type="submit"
            id="submitbutton"
            className={styles.studentsformbutton}
            // onClick="handleSubmit()"
            onClick={handleSubmit()}
          >
            Submit
          </button> */}

            <input type="submit" value="SUBMIT" />

            &nbsp;&nbsp;
            <input type='reset' value='RESET'></input>
          </form>
        </div>

        <footer className={styles.footer}>
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
              Powered by{""}
              <Image src='/vercel.svg'
                alt='Vercel Logo'
                width={72}
                height={16} />
            </span>
          </a>
        </footer>
      </div>
    </>
  );
}