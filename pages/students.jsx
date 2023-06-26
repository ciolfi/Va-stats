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
import Navbar from '../components/Navbar';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import React from 'react';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form'; 
import Image from 'next/image';

import { useEffect, useState } from 'react'; 
import Table from '@/components/Table';


export default function Page() {

    useForm();
    const { data: session, status } = useSession();
    const [dataResponse, setDataResponse] = useState([]);
    const [userResponse, setUserResponse] = useState([]);
    const [loading, setLoading] = useState(true);
        
    const [editingId, setEditingId] = useState(null);

    const [filteredStudents, setFilteredStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [nameSortOrder, setNameSortOrder] = useState('asc');
    const [contentLoading, setContentLoading] = useState(false);

    const handleEditStudent = (studentId) => {
        setEditingId(studentId);
    };

    const cancelEdit = () => {
        setEditingId(null);
    };

    const handleSearchChange = (item) => {
        setSearchTerm(item.target.value);
    };

    const handleNameSort = () => {
        if (nameSortOrder === 'asc') {
            setNameSortOrder('desc');
        } else {
            setNameSortOrder('asc');
        }
    };

    useEffect(() => {
        const sortStudentsByName = (students, order) => {
            if (order === 'asc') {
                return students.sort((a, b) => a.name.localeCompare(b.name));
            } else {
                return students.sort((a, b) => b.name.localeCompare(a.name));
            }
        };

        const sortedStudents = sortStudentsByName(dataResponse, nameSortOrder);
        const filteredStudents = sortedStudents.filter((student) =>
            student.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredStudents(filteredStudents);
    }, [dataResponse, searchTerm, nameSortOrder]);




    const handleUpdateStudent = async (editedStudent) => {
        setContentLoading(true);
        const response = await fetch('/api/updatestudents', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedStudent),
        });

        if (response.ok) {
            // i had to move getpagedata out of useeffect so i could call it here
            await getPageData();
            setEditingId(null);
        } else {
            console.error('Error updating the student');
        }
        setContentLoading(false);
    };

    const handleDeleteStudent = async (studentID) => {
        setContentLoading(true);
        const response = await fetch('/api/deletestudent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: studentID}),
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
        const apiUrlEndpoint = `https://visionaid-stats-ng.vercel.app/api/getstudentsdata`;
        // const apiUrlEndpoint = `http://localhost:3000/api/getstudentsdata`;
        const response = await fetch(apiUrlEndpoint);
        const res = await response.json();

        setDataResponse(res.students);
        setContentLoading(false);
    };

    useEffect(() => {
        getPageData();
    }, []);

    useEffect(() => {
        const sortStudentsByName = (students) => {
            return students.sort((a, b) => a.name.localeCompare(b.name));
        };

        const sortedStudents = sortStudentsByName(dataResponse);
        const filteredStudents = sortedStudents.filter((student) =>
            student.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredStudents(filteredStudents);
    }, [dataResponse, searchTerm]);

    
    var result;

    const getUserData = async () => {
        const apiUrlEndpoint = `https://visionaid-stats-ng.vercel.app/api/getuserdata`;
        // const apiUrlEndpoint = `http://localhost:3000/api/getuserdata`;
        const postData = {
            method: "Post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            email: session.user.email
            }),
        };
        //.log(postData);
        const response = await fetch(apiUrlEndpoint, postData);
        const res = await response.json();
        //console.log("RERESRS", res.users[0]);
        setUserResponse(res.users[0]);

        setUserResponse(res.users[0]);
        setLoading(false);

        result = res.users[0];
    };

    useEffect(() => {
        getUserData();
    }, [session]);


    result = userResponse;
    
    const studentsColumns = [
        {
			name: 'Id',
			width: '6%',
			accessor: 'id',
		}, {
			name: 'Email',
			accessor: 'email',
		}, {
			name: 'Name',
			accessor: 'name',
		}, {
			name: 'Phone Number',
			accessor: 'phone_number',
		}, {
			name: 'Gender',
			accessor: 'gender',
            type: 'enum',
			availableValues: ['M', 'F', 'Other'],
		}, {
			name: 'Birthdate',
			accessor: 'age',
		}, {
            name: 'Education History',
            accessor: 'edu_qualifications',
        }, {
            name: 'Courses of Interest',
            accessor: 'courses',
        }, {
			name: 'Location',
			accessor: 'location',
		}, {
			name: 'Learning Objective',
			accessor: 'objectives',
		},  {
			name: 'Vision Impairment History',
			accessor: 'vision_impairment',
		},  {
			name: 'Usable Vision',
			accessor: 'usable_vision',
        },
        {
            name: 'Is Qualified',
            accessor: 'is_qualified',
            type: 'boolean',
        },
        {
            name: 'Reference',
            accessor: 'source',
        },
        {
            name: 'Usable Vision',
            accessor: 'usable_vision',
        },
        {
            name: 'Registration Date',
            accessor: 'registration_date',
            type: 'date',
        },
	];
    
    if (loading) {
        return <p>Loading...</p>;
    }

    if (status === 'unauthenticated' || result[0].isactive === 0) {
        return (
            <div className='autherrorcontainer'>
                <Image alt={'VisionAid logo'} src={'/images/logo-mainsite.png'} height={100} width={150}/>
                <span className='autherrortext'>
                    Access denied.&nbsp;
                    <Link href='/' className='autherrorlink'>
                        Please sign in with an active account.
                    </Link>
                </span>
            </div>
        );
    } else {
        if ((result[0].role === 'MANAGEMENT' || result[0].role === 'PM' || result[0].role === 'ADMINISTRATOR')) {
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
                            <meta name="viewport" content="width=device-width, initial-scale=1"/>
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
                                All Students
                            </p>
                            <div className={styles.gridcourses}>
                                <Table columns={studentsColumns} tableData={dataResponse} isDelete={true} onDeleteClick={handleDeleteStudent} isEditable={true} isStudent={true} onEditSave={handleUpdateStudent} Title={'Students List'} />
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
        } else {
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
        }
    }    
}
