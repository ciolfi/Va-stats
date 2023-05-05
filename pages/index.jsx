/* Site HOME PAGE */

import Head from 'next/head';
import Navbar from '../components/Navbar';
import styles from '../styles/Home.module.css';
import aboutConfig from '@/configs/aboutPage.json';
import { useEffect, useState } from 'react';
import Title from '@/components/Title';

export default function Home() {
	const [batchCountResponse, setBatchCountResponse] = useState([]);
	const [courseCountResponse, setCourseCountResponse] = useState([]);
	const [studentCountResponse, setStudentCountResponse] = useState([]);


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

	return (
		<>
			<div>
				<Navbar className={styles.topnav} />
			</div> 
			<div className={styles.container}>
				<Head>
					<title>Vision-Aid</title>
					<meta name="description" content="A nonprofit, advocating on behalf of persons with vision issues of any type" />
					<meta name="theme-color" content="#ffffff" />
					<meta name="viewport" content="width=device-width, initial-scale=1"/>
					<link rel="icon" href="/favicon.ico" />
					<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
					<link rel="manifest" href="/manifest.json" />
				</Head>

				<main className={styles.main}>
					<h1 className={styles.title}>
						<a href="https://visionaid.org" target="_blank" rel="noreferrer">Vision-Aid</a>
					</h1>

					<p className={styles.subtitle}>
            Student Training and Tracking  System [STATS]
					</p>

					<div className={styles.grid}>
						<a href="https://www.loom.com/share/4cf53dd3cba945dfa8db2632b275add2" target="_blank" rel="noreferrer" className={styles.card}>
							<h2>Check out Demo &rarr;</h2>
							<p></p>
						</a>

						<a href="https://visionaid.org/about-vision-aid/mission-and-vision/" target="_blank" rel="noreferrer" className={styles.card}>
							<h2>About &rarr;</h2>
							<p>Learn about about our organization.</p>
						</a>

						<a href="/documentation/p2VisionAidSTATS-user-documentation.pdf" rel="noopener noreferrer" className={styles.card}>
							<h2>User Guide &rarr;</h2>
							<p>Learn how to use the VisionAid STATS platform.</p>
						</a>

						<a className={styles.card}>
							<h2>Overall Stats</h2>
							<p>Total Number Students: {studentCountResponse}</p>
							<p>Total Number Courses: {courseCountResponse}</p>
							<p>Total Number Batches: {batchCountResponse}</p>
						</a>
					</div>
				</main>
			</div>			
		</>
	);
};