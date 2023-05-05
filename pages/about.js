import Navbar from '@/components/Navbar';
import Head from 'next/head';
import Title from '@/components/Title';
import styles from '@/styles/About.module.css';
import { generateTeamCards } from '@/utils/aboutHelper';
import aboutConfig from '@/configs/aboutPage.json';
import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';

export default function About() {
	const pageTitle = aboutConfig.pageTitle;
	const projectDescriptionTitle = aboutConfig.titles.project_description;
	const surveyTitle = aboutConfig.titles.survey_title;
	const toLogIn = aboutConfig.titles.toLogIn;

	const teamDetailsTitle = aboutConfig.titles.team_details;
	const projectGoalsTitle = aboutConfig.titles.project_goals;
	const lighthouseMetricsTitle = aboutConfig.titles.lighthouse_metrics;
	const presentationTitle = aboutConfig.titles.pres;
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);

	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
	}

	const teamCards = generateTeamCards();

	return (
		<>
			<Navbar />
			<div className={styles.aboutDiv}>
				{/* Project description here */}
				<Head>
					<title>{pageTitle}</title>
					<meta name="description" content="About the VisionAID STATS team and project goals." />
					<meta name="theme-color" content="#ffffff" />
					<link rel="icon" href="/favicon.ico" />
					<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
					<link rel="manifest" href="/manifest.json" />
				</Head>
				<div>
					<Title title={projectDescriptionTitle} />
					<p className={styles.projectDescription}>
						Vision-Aid STATS is a centralized tracking system that can be used by VisionAid staff (Management, Program Managers and Administrators) to manage courses and student enrollments. The goal of VisionAid STATS is to make course and student management a more seamless experience for VisionAid staff, improve operational efficiency of the VisionAid program, and to serve as a single platform for all administration needs. VisionAid stats is an cloud-deployed application via Vercel, and is desktop and mobile-friendly, powered by PWA. 
					</p>
					<p>
					TO LOG IN AND PEER EVALUATE: Gmail: c4gp2visionaidstats@gmail.com  PW: --
					</p>
				</div>

				<div className={styles.survey_container}>
					<Head>
						<title>Vision-Aid</title>
						<meta name="description" content="A nonprofit, advocating on behalf of persons with vision issues of any type" />
						<meta name="theme-color" content="#ffffff" />
						<link rel="icon" href="/favicon.ico" />
						<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
						<link rel="manifest" href="/manifest.json" />
					</Head>

					<main className={styles.survey_main}>
						<h1 className={styles.survey_title}>
							<a href="https://docs.google.com/forms/d/e/1FAIpQLSf5C9_agtIoEeEyA1xzrsTmVYeZdW0yXLhTTHnlRMEBzkUd6g/viewform?usp=sf_link" target="_blank" rel="noreferrer">Peer Survey Here!</a>
						</h1>
						
						
					</main>
					
					
				</div>



				{/* Team details here */}
				<div>

					<Title title={teamDetailsTitle} />
					<div className={styles.teamCards}>
						{teamCards[0]}
						{teamCards[1]}
					</div>
					<div className={styles.teamCards}>
						{teamCards[2]}
						{teamCards[3]}
					</div>
					<div className={styles.teamCards}>
						{teamCards[4]}
					</div>
				</div>

				{/* Project goals */}
				<div>
					<Title title={projectGoalsTitle} />
					<p className={styles.projectDescription}>
						Develop and deploy Vision-Aid STATS: a platform that allows VisionAID staff to track courses and student enrollments. We aim to ensure proper permission levels are established for Admins, Program Managers, and Volunteers to only be able to access and modify permitted resources. The platform will also be mobile friendly. If time permits, as a nice-to-have, we will develop a dashboard of metrics on class enrollment trends.
						Our goal is to have Vision-Aid staff start using the initial version of the platform we develop by the end of February, so that we can get fast feedback to iterate and develop the remaining features for them.
					</p>
					<p className={styles.projectDescription}>
						Our goal is to have Vision-Aid staff start using the initial version of the platform we develop by the end of February, so that we can get fast feedback to iterate and develop the remaining features for them.
					</p>
					<br />
					<p className={styles.projectDescription}>
						In summary:
					</p>
					<ul>
						<li>The main deliverable will be the platform deployed on Vercel with a DreamHost MySQL server as the backing database.</li>
						<li>Developer Documentation including instructions on setting up local dev env, testing, and deployment of the platform. </li>
						<li>User-facing Documentation, which guides VisionAid staff on how to use the website to meet their needs. This may take the form of a FAQ page. </li>
					</ul>
					<br />
				</div>

				{/* Lighthouse image */}
				<div className={styles.lighthouseMetric}>
					<Title title={lighthouseMetricsTitle} />
					<ul>
						<li>Performance: 1.00</li>
						<li>Accessibility: 0.98</li>
						<li>Best Practices: 0.92</li>
						<li>SEO: 1.00</li>
						<li>PWA: 1.00</li>
						<li>TOTAL: 0.98</li>
					</ul>
				</div>

				<div className={styles.pres}>
					<Title title={presentationTitle} />
					<a href='/downloads/VisionAID-STATS.pdf' download>Click here to download!</a>
				</div>
			</div>
		</>
	);
};
