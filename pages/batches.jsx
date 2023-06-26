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
            // i had to move getpagedata out of useeffect so i could call it here
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
            body: JSON.stringify({id: batchID}),
        });

        if (response.ok) {
            // i had to move getpagedata out of useeffect so i could call it here
            await getPageData();
        } else {
            console.error('Error deleting the batch');
        }
		setContentLoading(false);
    };

	const getPageData = async () => {

        setContentLoading(true);

		const apiUrlEndpoint = `https://visionaid-stats-ng.vercel.app/api/getbatchesdata`;
		//const apiUrlEndpoint = `http://localhost:3000/api/getbatchesdata`;


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
				<Image alt={'VisionAid logo'} src={'/images/logo-mainsite.png'} height={100} width={150}/>
				<span className='autherrortext'>
					Access denied.&nbsp;
					<Link href='/' className='autherrorlink'>
						Please sign in.
					</Link>
				</span>
			</div>
		);
	}

	const batchesColumns = [
		{
			name: 'Id',
			width: '6%',
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
		},  {
			name: 'PM',
			accessor: 'PM',
		}, {
			name: 'Teaching Assistant',
			accessor: 'TA',
		},
		{
			name: 'Status',
			accessor: 'status',
			type: 'enum',
			availableValues: ['UNSTARTED', 'ONGOING', 'COMPLETE'],
		},  {
			name: 'Mode of Training',
			accessor: 'trainingmode',
			type: 'enum',
			availableValues: ['VIRTUAL', 'IN-PERSON', 'SELF-PACED'],
		},  {
			name: 'Cost',
			accessor: 'cost',
		},  {
			name: 'Currency',
			accessor: 'currency',
			type: 'enum',
			availableValues: ['INR', 'USD'],
		},

	];
	if (status === 'authenticated') {	
		if ((result.length === 0)) {
			return (
				<div className='autherrorcontainer'>
					<Image alt={'VisionAid logo'} src={'/images/logo-mainsite.png'} height={100} width={150}/>
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
			if((result[0].role === 'MANAGEMENT' || result[0].role === 'PM')) {
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

						<main className={styles.mainstudents}>
							{contentLoading?
								<div className={styles.overlay}>
									<span className={styles.customLoader}></span>
								</div>
								: <></>
							}
							<p className={styles.subtitle}>
								Batch Management
							</p>

							<div className={styles.gridcourses}>
								{showForm ?
									<div className={styles.cardcoursesform}>
										<h2>Create batch &rarr;</h2><br />
										<Image alt={'close batches form'} src={'/icons/expand-up.svg'} height={30} width={30} onClick={() => setShowForm(false)} className={styles.collapseButton} title="Close Batches Form" />
										<form action='/api/batchcreate' method='post' onSubmit={() => handleSubmit()}> 
											<label htmlFor='coursename'>Course Name:<span className={styles.requiredelement}>&#42;</span></label> 
											<select name='coursename' id='coursename' style={{width: '150px'}} required>
												{courseOptions}
											</select><br /><br /> 

											<label htmlFor='batch'>Batch:<span className={styles.requiredelement}>&#42;</span></label>
											<input type='text' id='batch' name='batch' required /><br /><br /> 

											<label htmlFor='coursestart'>Start:<span className={styles.requiredelement}>&#42;</span></label> 
											<input type='date' id='coursestart' name='coursestart' placeholder = "MM/DD/YYYY" required /><br /><br /> 

											<label htmlFor='courseend'>End:<span className={styles.requiredelement}>&#42;</span></label> 
											<input type='date' id='courseend' name='courseend' placeholder = "MM/DD/YYYY" required /><br /><br /> 

											<label htmlFor='coursedays'>Days:<span className={styles.requiredelement}>&#42;</span></label> 
											<div>
												<input type='checkbox' id='M' name='coursedays' value="M"/>
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
											</div>

											<label htmlFor='coursetimestart'>Start Time:<span className={styles.requiredelement}>&#42;</span></label> 
											<input type='time' id='coursetimestart' name='coursetimestart' defaultValue='12:00' required /><br /><br /> 

											<label htmlFor='coursetimeend'>End Time:<span className={styles.requiredelement}>&#42;</span></label> 
											<input type='time' id='coursetimeend' name='coursetimeend' defaultValue='12:00' required /><br /><br />

											<label htmlFor='instructor'>Instructor:<span className={styles.requiredelement}>&#42;</span></label> 
											<input type='text' id='instructor' name='instructor' required /><br /><br /> 

											<label htmlFor='PM'>PM:<span className={styles.requiredelement}>&#42;</span></label> 
											<input type='text' id='PM' name='PM' required /><br /><br /> 

											<label htmlFor='TA'>Teaching Assistant:<span className={styles.requiredelement}>&#42;</span></label> 
											<input type='text' id='TA' name='TA' required /><br /><br /> 

											<label htmlFor='cost'>Cost:<span className={styles.requiredelement}>&#42;</span></label> 
											<input type='text' id='cost' name='cost' placeholder = 'If free, input 0.' required /><br /><br /> 

											<label htmlFor='currency'>Currency:<span className={styles.requiredElement}>&#42;</span></label>
											<input type="radio" id="rupees" name="currency" value="INR"/>
											<label for="rupees">INR</label>
											<input type="radio" id="usd" name="currency" value="USD"/>
											<label for="usd">USD</label><br></br>

											<label htmlFor='trainingmode'>Mode of Training:<span className={styles.requiredelement}>&#42;</span></label> 
											<input list='trainingmodes' id='trainingmode' name='trainingmode' required /><br /><br /> 
											<datalist id="trainingmodes">
												<option value="VIRTUAL"/>
												<option value="IN-PERSON"/>
												<option value="SELF-PACED"/>
											</datalist>

											<button type='submit' className={styles.studentsformbutton}>Submit</button>&nbsp;&nbsp; 
											<input type='reset' value='RESET'></input> 
										</form>
									</div>
									: <Button onClick={() => setShowForm(true)} text={'+ New Batch Form'}></Button>
								}
								<Table columns={batchesColumns} tableData={dataResponse} isDelete={true} onDeleteClick={handleDeleteBatch} isEditable={true} onEditSave={handleUpdateBatch} Title={'Batches List'} FilterButton={true} isBatch={true} />
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
							<p className={styles.subtitle}>
								Batch Management
							</p>

							<div className={styles.gridcourses}>
								<Table columns={batchesColumns} tableData={dataResponse} Title={'Batches List'} />
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
}
