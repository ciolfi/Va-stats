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

import Head from 'next/head';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import React from 'react';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form'; // Form reset

import { useEffect, useState } from 'react'; // NEW CODE
import Table from '@/components/Table';
import Button from '@/components/Button';

export default function Page() {
	// const res = null;

	useForm(); // Form reset
	const { data: session, status } = useSession();

	// CHANGE URL below for local testing
	// Note: useState() is the required empty array
	const [dataResponse, setDataResponse] = useState([]);
	const [userResponse, setUserResponse] = useState([]);
	const [showForm, setShowForm] = useState(false);
	const [contentLoading, setContentLoading] = useState(false);

	const [loading, setLoading] = useState(true);
	let isDelete = false, isEditable = false;

	const handleUpdateCourse = async (editedCourse) => {
		setContentLoading(true);
		const response = await fetch('/api/updatecourse', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(editedCourse),
		});

		if (response.ok) {
			// i had to move getpagedata out of useeffect so i could call it here
			await getPageData();
		} else {
			console.error('Error updating the courses');
		}
		setContentLoading(false);
	};

	const handleDeleteCourse = async (courseID) => {
		setContentLoading(true);
		const response = await fetch('/api/deletecourse', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ id: courseID }),
		});

		if (response.ok) {
			// i had to move getpagedata out of useeffect so i could call it here
			await getPageData();
		} else {
			console.error('Error deleting the courses');
		}
		setContentLoading(false);
	};

	const getPageData = async () => {
		setContentLoading(true);
    	const apiUrlEndpoint = `https://visionaid-stats-ng.vercel.app/api/getcoursesdata`;
		//const apiUrlEndpoint = "http://localhost:3000/api/getcoursesdata";
        const response = await fetch(apiUrlEndpoint);
        const res = await response.json();
        setDataResponse(res.courses);

		setContentLoading(false);
	};

	useEffect(() => {
		getPageData();
	}, []);

	var result;

	const getUserData = async () => {

        const apiUrlEndpoint = `https://visionaid-stats-ng.vercel.app/api/getuserdata`;
        //const apiUrlEndpoint = `http://localhost:3000/api/getuserdata`;
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
	}

	const coursesColumn = [
		{
			name: 'Id',
			width: '6%',
			accessor: 'id',
		}, {
			name: 'Name',
			accessor: 'course',
		}, {
			name: 'Description',
			accessor: 'description',
		}, {
			name: 'Duration',
			accessor: 'duration',
		},
		{
			name: 'Duration_Type',
			accessor: 'duration_type',
			type: 'enum',
			availableValues: ['Weeks', 'Months'],
		},
	];
	if (status === 'authenticated') {
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
				isDelete = true;
				isEditable = true;
			} else {
				isDelete = false;
				isEditable = false;
			}
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
							<link rel='icon' href='/favicon.ico' />
							<link rel='apple-touch-icon' href='/apple-touch-icon.png' />
							<link rel='manifest' href='/manifest.json' />
							<meta name="viewport" content="width=device-width, initial-scale=1"/>

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

						<main className={styles.mainstudents}>
							{contentLoading ?
								<div className={styles.overlay}>
									<span className={styles.customLoader}></span>
								</div>
								: <></>
							}
							<p className={styles.subtitle}>
								Course Management
							</p>

							<div className={styles.gridcourses}>
								{(result[0].role === 'MANAGEMENT' || result[0].role === 'PM') ?
									<>
										{showForm ?
											<div className={styles.cardcoursesform}>
												<h2>Create Course &rarr;</h2><br />
												<Image alt={'close batches form'} src={'/icons/expand-up.svg'} height={30} width={30} onClick={() => setShowForm(false)} className={styles.collapseButton} title="Close Course Form" />
												<form action='/api/coursecreate' method='post' onSubmit={() => handleSubmit()}>
													<label htmlFor='course'>Name:<span className={styles.requiredelement}>&#42;</span></label>
													<input type='text' id='course' name='course' required /><br /><br />

													<label htmlFor='description'>Description:</label>
													<input type='text' id='description' name='description' /><br /><br />

													<label htmlFor='duration'>Duration:<span className={styles.requiredelement}>&#42;</span></label>
													<input type='text' id='duration' name='duration' required /><br /><br />

													<label htmlFor='duration_type'>Duration Type:<span className={styles.requiredElement}>&#42;</span></label>
													<input type="radio" id="weeks" name="duration_type" value="Weeks" />
													<label for="weeks">Weeks</label>
													<input type="radio" id="months" name="duration_type" value="Months" />
													<label for="months">Months</label><br></br>

													<button type='submit' className={styles.studentsformbutton}>Submit</button>&nbsp;&nbsp;
													<input type='reset' value='RESET'></input>
												</form>
											</div>
											: <Button onClick={() => setShowForm(true)} text={'+ New Course Form'}></Button>
										}
									</>

									: <></>
								}
								<Table columns={coursesColumn} tableData={dataResponse} isDelete={isDelete} onDeleteClick={handleDeleteCourse} isEditable={isEditable} onEditSave={handleUpdateCourse} Title={'Courses List'} />
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
										Powered by{"' '"}
										<Image src='/vercel.svg'
											alt='Vercel Logo'
											width={72}
											height={16} />
									</span>
								</a>
							</footer>
						</main>
					</div>
				</>
			);

		}
	}
}
