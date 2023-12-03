/* SITE HOME PAGE */
"use client";

import Head from 'next/head';
import Navbar from '../components/Navbar';
import styles from '../styles/Home.module.css';
import aboutConfig from '@/configs/aboutPage.json';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Fragment } from "react";
import Title from '@/components/Title';

// IMPORTS BELOW REMOVE SSRPROVIDER ERRORS
// import { NextUIProvider } from '@nextui-org/react';
// import { useSSR } from '@nextui-org/react';
var userRole = "STAFF";

export default function Home() {
  const [batchCountResponse, setBatchCountResponse] = useState([]);
  const [courseCountResponse, setCourseCountResponse] = useState([]);
  const [studentCountResponse, setStudentCountResponse] = useState([]);

  const { data: session, status } = useSession();
  var result;

  // API DATA ACCESS
  const getUserData = async () => {
    const apiUrlEndpoint = process.env.NEXT_PUBLIC_API_URL + `getuserdata`;
    const postData = {
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({              
        /* AVOID LOCAL TESTING ERRORS: Switch email below to your Gmail.
        IMPORTANT: Remember to switch back prior to uploading. */
        email: session.user.email
      }),
    };
    const response = await fetch(apiUrlEndpoint, postData);
    const res = await response.json();
    result = res.users[0];                /* LOCAL TESTING */

    if (status == "authenticated") {
      userRole = result[0].role;
    }
  };

  useEffect(() => {
    getUserData();
  }, [session]);

  const getBatchCount = async () => {
    const apiUrlEndpoint = `api/countbatch`;
    const response = await fetch(apiUrlEndpoint);
    const res = await response.json();
    setBatchCountResponse(res.count);
  };
  const getCourseCount = async () => {
    const apiUrlEndpoint = `api/countcourse`;
    const response = await fetch(apiUrlEndpoint);
    const res = await response.json();
    setCourseCountResponse(res.count);
  };
  const getStudentCount = async () => {
    const apiUrlEndpoint = `api/countstudent`;
    const response = await fetch(apiUrlEndpoint);
    const res = await response.json();
    setStudentCountResponse(res.count);
  };
  useEffect(() => {
    getBatchCount();
    getCourseCount();
    getStudentCount();
  }, []);

  // CODE LINE BELOW: FOR SSRPROVIDER ERRORS
  // const { isBrowser } = useSSR()

  // Service worker registration begins
  // class Index extends React.Component {
  // componentDidMount = () => {
  // if ("serviceWorker" in navigator) {
  //       window.addEventListener("load", function () {
  //         navigator.serviceWorker.register("./public/sw.js").then(
  //           function (registration) {
  //             console.log(
  //               "Service Worker registration successful with scope: ",
  //               registration.scope
  //             );
  //           },
  //           function (err) {
  //             console.log("Service Worker registration failed: ", err);
  //           }
  //         );
  //       });
  //     }
  //   render();
  //    {
  //     return <div> hello </div>;
  //    }
  // };
  //}
  // Service worker registration ENDS

  return (

    // 2 CODE LINES BELOW: FOR SSRPROVIDER ERRORS
    // isBrowser && (
    // <NextUIProvider>
      <>
        {/* Escape single quotes below */}
        {/* if (typeof navigator.serviceWorker !== 'undefined') { */}
        {/* <script>
          if (typeof navigator.serviceWorker !== &lsquo;undefined&rsquo;) {
            navigator.serviceWorker.register('sw.js')
          }
        </script> */}

        <div>
          <Navbar user_role={userRole} className={styles.topnav} />
        </div>
        <div className={styles.container}>
          <Head>
            <title>Vision-Aid</title>
            <meta name="google-signin-client_id" content="81017730584-986m405knu7rpfudp25kv0hr3td2d76v.apps.googleusercontent.com" />
            <meta name="description" content="A nonprofit, advocating on behalf of persons with vision issues of any type" />
            <meta name="theme-color" content="#ffffff" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
            <link rel="manifest" href="/manifest.json" />
          </Head>

          <main className={styles.main}>
            <h1 className={styles.title}>
              <a href="https://visionaid.org" target="_blank" rel="noreferrer">Vision-Aid</a>
            </h1>

            <p className={styles.subtitlehm}>
              {/* <p className={styles.subtitlehm}> */}
              Student Training and Tracking  System [STATS]
            </p>

            <div className={styles.grid}>
              <a href="https://www.loom.com/share/4cf53dd3cba945dfa8db2632b275add2" target="_blank" rel="noreferrer" className={styles.card}>
                <h2>Check out Demo &rarr;</h2>
                <p></p>
              </a>

              <a href="https://visionaid.org/about-vision-aid/mission-and-vision" target="_blank" rel="noreferrer" className={styles.card}>
                <h2>About &rarr;</h2>
                <p>Learn about our organization.</p>
              </a>

              <a href="/documentation/p2VisionAidSTATS-user-documentation.pdf" rel="noopener noreferrer" className={styles.card}>
                <h2>User Guide &rarr;</h2>
                <p>Learn how to use the VisionAid STATS platform.</p>
              </a>

              {/* <a className={styles.card}> */}
              <div className={styles.card}>
                <h2>Overall Stats</h2>
                <p>Total Number Students: {studentCountResponse}</p>
                <p>Total Number Courses: {courseCountResponse}</p>
                <p>Total Number Batches: {batchCountResponse}</p>
              </div>
              {/* </a> */}
            </div>
          </main>
        </div>
      </>

      // 2 CODE LINES BELOW: FOR SSRPROVIDER ERRORS 
    // </NextUIProvider> */}
    //)

  );
}
