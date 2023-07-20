/* This page registers a new student;
usually done by a project manager */

import Navbar from '../components/Navbar';
import styles from '../styles/Home.module.css';
import React from 'react';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form'; // Form reset
import Head from 'next/head';
import { useState } from 'react';

// MODAL CODE
import Modal from "../components/Modal";
//import {useState} from "react";

// POPUP CODE
// import Router from "next/router";

export default function Page() {
    useForm(); // Form reset
    const { data: session, status } = useSession();
    // Note: useState() is the required empty array
    const [dataResponse, setDataResponse] = useState([]);
    const [userResponse, setUserResponse] = useState([]);
    const [contentLoading, setContentLoading] = useState(false);

    // POPUP CODE 
    // const [route, setRoute] = useState();

    const handleSubmit = () => {
        // POPUP CODE
        // alert("Registration successful.");

        setContentLoading(true);

        // POPUP CODE 
        // Router.push("https://va-stats.vercel.app/students", { shallow: true });

        // MODAL CODE
        setShowModal(true);
        <div>
        {showModal &&
            <Modal onClose={() => setShowModal(false)}>
                Registration was successful!
            </Modal>}
        </div>;
    };

    // if (status === 'loading') {
    //     return <p>Loading...</p>;
    // }

    return (
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
								crossOrigin /> */}
                <link rel='preconnect'
                    href='https://fonts.gstatic.com'
                    crossOrigin="true" />

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

            {/* ----------- POPUP CODE ----------- */}
            {/* <div>
                <h4>Successful Submission!</h4>
                {/* <Popup position="right center"> 
                <Popup trigger={submitbutton} position="right top">
                    <div>Thanks for submitting!</div>
                    <button>Return</button>
                </Popup>
            </div> */}

            <div className={styles.studentapplicationform}>
                <h2>Student Application Form &rarr;</h2><br />
                <form action='/api/studentapplication' method='post' onSubmit={() => handleSubmit()}>
                    <label htmlFor='email'>Email:<span className={styles.requiredelement}>&#42;</span></label>
                    <input type='text' id='email' name='email' required /><br /><br />

                    <label htmlFor='name'>Name:<span className={styles.requiredelement}>&#42;</span></label>
                    <input type='text' id='name' name='name' required /><br /><br />

                    <label htmlFor='phone_number'>Phone Number:<span className={styles.requiredelement}>&#42;</span></label>
                    <input type='text' id='phone_number' name='phone_number' required /><br /><br />

                    <label htmlFor='alt_ph_num'>Alternate Phone Number:<span className={styles.requiredelement}></span></label>
                    <input type='text' id='alt_ph_num' name='alt_ph_num' /><br /><br />

                    <label htmlFor='gender'>Gender:<span className={styles.requiredelement}>&#42;</span></label>
                    <input list='genders' id='gender' name='gender' required /><br /><br />
                    <datalist id="genders">
                        <option value="M" />
                        <option value="F" />
                        <option value="Other" />
                    </datalist>

                    <label htmlFor='age'>Birth Date:<span className={styles.requiredelement}>&#42;</span></label>
                    <input type='date' id='age' name='age' placeholder='MM/DD/YYYY' required /><br /><br />

                    <label htmlFor='edu_qualifications'>Education qualifications:<span className={styles.requiredelement}>&#42;</span></label>
                    <input type='text' id='edu_qualifications' name='edu_qualifications' required /><br /><br />

                    <label htmlFor='courses'>What courses are you interested in? Go to the Courses page for a list of available courses.<span className={styles.requiredelement}>&#42;</span></label>
                    <input type='text' id='courses' name='courses' required /><br /><br />

                    <label htmlFor='location'>What city and state are you from?<span className={styles.requiredelement}>&#42;</span></label>
                    <input type='text' id='location' name='location' required /><br /><br />

                    <label htmlFor='objectives'>What are your long term learning objectives?</label>
                    <input type='text' id='objectives' name='objectives' /><br /><br />

                    <label htmlFor='vision_impairment'>Provide a brief history of your vision impairment</label>
                    <input type='text' id='vision_impairment' name='vision_impairment' /><br /><br />

                    <label htmlFor='usable_vision'>What is your usable vision in terms of acuity and field?</label>
                    <input type='text' id='usable_vision' name='usable_vision' /><br /><br />

                    <label htmlFor='total_vision_loss'>What is the percentage of vision loss?<span className={styles.requiredelement}>&#42;</span></label>
                    <input type='text' id='total_vision_loss' name='total_vision_loss' required /><br /><br />

                    <label htmlFor='source'>How did you hear about the program?<span className={styles.requiredelement}>&#42;</span></label>
                    <input type='text' id='source' name='source' required /><br /><br />

                    <button
                        type="submit"
                        id="submitbutton"
                        className={styles.studentsformbutton}
                        onclick="handleSubmit()"
                    >
                        Submit
                    </button>

                    &nbsp;&nbsp;
                    <input type='reset' value='RESET'></input>
                </form>
            </div>
        </>
    );
}