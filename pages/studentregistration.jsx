/* This page uses the same 'template' as /students.jsx.
NOTE: PAGE ACCESS REQUIRES AUTHENTICATION;
please see authorized users in code below, which are
also listed in Google Developer console.
This file is reached by clicking 'Courses' in the live site;
It displays 2 cards with the following functionality:
Left side card - current courses.
Right side card - a form that adds course information.
Course data is brought into the left side card by calling the 
assetHandler function in pages/api/students.js.
NOTE REGARDING PHOTOS: Currently, if a student with photo is
desired, the student must be added via phpMyAdmin.
STYLING NOTE: Most of this view uses the same styling as 
for the 'Students' view, i.e., CSS classes use the 'student'
verbiage, although 'courses' are involved.
NOTE REGARDING THE TABLE INVOLVED: This table, vacourses, and its
data are automatically created through code, if it does not exist.

IMPORTANT: Change the code in useEffect() below when testing locally. */


import Navbar from '../components/Navbar';
import styles from '../styles/Home.module.css';
import React from 'react';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form'; // Form reset
import Head from 'next/head';

import { useState } from 'react'; // NEW CODE

export default function Page() {

    useForm(); // Form reset
    const { data: session, status } = useSession();

    // CHANGE URL below for local testing
    // Note: useState() is the required empty array
    const [dataResponse, setDataResponse] = useState([]);
    const [userResponse, setUserResponse] = useState([]);
    const [contentLoading, setContentLoading] = useState(false);
 
    const handleSubmit = () => {
		setContentLoading(true);
	};

    if (status === 'loading') {
        return <p>Loading...</p>;
    }
    return (
        <>
            {contentLoading? 
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
                            <meta name="viewport" content="width=device-width, initial-scale=1"/>
							<link rel='icon' href='/favicon.ico' />
							<link rel='apple-touch-icon' href='/apple-touch-icon.png' />
							<link rel='manifest' href='/manifest.json' />

							<link rel='preconnect'
								href='https://fonts.gstatic.com'
								crossOrigin />

							<link rel='preload'
								as='style'
								href='https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;700&display=swap' />

							<link rel='stylesheet'
								href='https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;700&display=swap'
								media='print'
								onLoad="this.media='all'" />

							<noscript>
								<link rel='stylesheet'
									href='https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;700&display=swap' />
							</noscript>
						</Head>
            <div className={styles.studentapplicationform}>
                <h2>Student Application Form &rarr;</h2><br />
                    <form action='/api/studentapplication' method='post' onSubmit={() => handleSubmit()}>
                        <label htmlFor='email'>Email:<span className={styles.requiredelement}>&#42;</span></label>
                        <input type='text' id='email' name='email' required /><br /><br />

                        <label htmlFor='name'>Name:<span className={styles.requiredelement}>&#42;</span></label>
                        <input type='text' id='name' name='name' required /><br /><br />
                    
                        <label htmlFor='phone_number'>Phone Number:<span className={styles.requiredelement}>&#42;</span></label>
                        <input type='text' id='phone_number' name='phone_number' required /><br /><br />
                    
                        <label htmlFor='gender'>Gender:<span className={styles.requiredelement}>&#42;</span></label>
                        <input list='genders' id='gender' name='gender' required /><br /><br />
                        <datalist id="genders">
                            <option value="M" />
                            <option value="F" />
                            <option value="Other" />
                        </datalist>

                        <label htmlFor='age'>Birth Date:<span className={styles.requiredelement}>&#42;</span></label>
                        <input type='date' id='age' name='age' placeholder = 'MM/DD/YYYY' required /><br /><br />

                        <label htmlFor='edu_qualifications'>Education qualifications:<span className={styles.requiredelement}>&#42;</span></label>
                        <input type='text' id='edu_qualifications' name='edu_qualifications' required/><br /><br />

                        <label htmlFor='courses'>What courses are you interested in? Go to the Courses page for a list of available courses.<span className={styles.requiredelement}>&#42;</span></label>
                        <input type='text' id='courses' name='courses' required/><br /><br />
                    
                        <label htmlFor='location'>What city and state are you from?<span className={styles.requiredelement}>&#42;</span></label>
                        <input type='text' id='location' name='location' required /><br /><br />

                        <label htmlFor='objectives'>What are your long term learning objectives?<span className={styles.requiredelement}>&#42;</span></label>
                        <input type='text' id='objectives' name='objectives' required /><br /><br />
                    
                        <label htmlFor='vision_impairment'>Provide a brief history of your vision impairment<span className={styles.requiredelement}>&#42;</span></label>
                        <input type='text' id='vision_impairment' name='vision_impairment' required /><br /><br />
                    
                        <label htmlFor='usable_vision'>What is your usable vision in terms of acuity and field?<span className={styles.requiredelement}>&#42;</span></label>
                        <input type='text' id='usable_vision' name='usable_vision' required /><br /><br />
                    
                        <label htmlFor='total_vision_loss'>What is the percentage of vision loss?<span className={styles.requiredelement}>&#42;</span></label>
                        <input type='text' id='total_vision_loss' name='total_vision_loss' required /><br /><br />

                        <label htmlFor='source'>How did you hear about the program?<span className={styles.requiredelement}>&#42;</span></label>
                        <input type='text' id='source' name='source' required/><br /><br />
                    
                        <button type='submit' className={styles.studentsformbutton}>Submit</button>&nbsp;&nbsp;
                        <input type='reset' value='RESET'></input>
                    </form>
                </div>
        </>
    );
}