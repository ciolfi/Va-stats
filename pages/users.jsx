/* This page uses the same 'template' as /students.jsx.
NOTE: PAGE ACCESS REQUIRES AUTHENTICATION;
please see authorized users in code below, which are
also listed in Google Developer console.

This file is reached by clicking 'Users' in the live site;
It displays 2 cards with the following functionality:

    Left side card - current users.
    Right side card - a form that adds user information.

User data is brought into the left side card by calling the 
assetHandler function in pages/api/users.js.



STYLING NOTE: Most of this view uses the same styling as 
for the 'Students' view, i.e., CSS classes use the 'student'
verbiage, although 'users' are involved.

NOTE REGARDING THE TABLE INVOLVED: This table, vausers, and its
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
            // i had to move getpagedata out of useeffect so i could call it here
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
            // i had to move getpagedata out of useeffect so i could call it here
            await getPageData();
        } else {
            console.error('Error deleting the batch');
        }
        setContentLoading(false);
    };




    const getPageData = async () => {
        setContentLoading(true);
        const apiUrlEndpoint = `https://visionaid-stats-ng.vercel.app/api/getusersdata`;
        //const apiUrlEndpoint = `http://localhost:3000/api/getusersdata`;
        const response = await fetch(apiUrlEndpoint);
        const res = await response.json();

        setDataResponse(res.users);
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
                <Image alt={'VisionAid logo'} src={'/images/logo-mainsite.png'} height={100} width={150}/>
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
                                All VisionAid Staff
                            </p>
                            <div className={styles.gridcourses}>
                                {showForm ?
                                    <div className={styles.cardcoursesform}>
                                        <h2>Add New Staff Member &rarr;</h2><br />
										<Image alt={'close batches form'} src={'/icons/expand-up.svg'} height={30} width={30} onClick={() => setShowForm(false)} className={styles.collapseButton} title="Close User Creation Form" />
                                        <form action='/api/usercreate' method='post' onSubmit={() => handleSubmit()}>
                                            <label htmlFor='id'>VisionAid User ID:<span className={styles.requiredelement}>&#42;</span></label>
                                            <input type='text' id='id' name='id' required /><br /><br />

                                            <label htmlFor='email'>Email:<span className={styles.requiredelement}>&#42;</span></label>
                                            <input type='text' id='email' name='email' required /><br /><br />

                                            <label htmlFor='firstname'>First Name:<span className={styles.requiredelement}>&#42;</span></label>
                                            <input type='text' id='firstname' name='firstname' required /><br /><br />

                                            <label htmlFor='lastname'>Last Name:<span className={styles.requiredelement}>&#42;</span></label>
                                            <input type='text' id='lastname' name='lastname' required /><br /><br />

                                            <label htmlFor='role'>Role:<span className={styles.requiredelement}>&#42;</span></label>
                                            <input list='roles' id='role' name='role' required /><br /><br />
                                            <datalist id="roles">
                                                <option value="MANAGEMENT" />
                                                <option value="PM" />
                                                <option value="ADMINISTRATOR" />
                                            </datalist>

                                            <button type='submit' className={styles.studentsformbutton}>Submit</button>&nbsp;&nbsp;
                                            <input type='reset' value='RESET'></input>
                                        </form>
                                    </div>
                                    : <Button onClick={() => setShowForm(true)} text={'+ New VA Staff'}></Button>
                                }
                                <Table columns={usersColumns} tableData={dataResponse} isDelete={true} onDeleteClick={handleDeleteUser} isEditable={true} onEditSave={handleUpdateUser} Title={'Staff List'} />
                            </div>
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

            } else {
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
