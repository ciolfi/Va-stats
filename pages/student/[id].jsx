import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Navbar from "../../components/Navbar";
import styles from "../../styles/Home.module.css";
import Link from "next/link";
import Table from '@/components/Table';
import Head from 'next/head';

export default function Page() {
  const router = useRouter();
  const { id } = router.query;
  const { data: session, status } = useSession();

  const [loading, setLoading] = useState(true);
  const [userResponse, setUserResponse] = useState([]);
  const [dataResponse, setDataResponse] = useState([]);

  const [studentName, setStudentName] = useState("");
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
        setUserResponse(res.users[0][0]);

        setLoading(false);
    };

    result = userResponse;

    useEffect(() => {
      if (session) {
        getUserData();
        getStudentData();
      }
    }, [session]);


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
        name: 'Instructor',
        accessor: 'instructor',
      },  {
        name: 'Status',
        accessor: 'status',
        type: 'enum',
        availableValues: ['UNSTARTED', 'ONGOING', 'COMPLETE'],
      }
    ];
    const getStudentData = async () => {
       const apiUrlEndpoint = `https://visionaid-stats-ng.vercel.app/api/getstudentdetails`;
       //const apiUrlEndpoint = "http://localhost:3000/api/getstudentdetails";
      const postData = {
        method: "Post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_id: id,
        }),
      };
      const response = await fetch(apiUrlEndpoint, postData);
      const data = await response.json();
         
      setStudentName(data.name);
      setDataResponse(data.batches);
      //console.log("Student data: ", data);

      setLoading(false);
    };

    if (loading) {
      return <p>Loading...</p>;
    }

    if (status === 'unauthenticated' || userResponse.isactive === 0) {
      return (
        <div className='autherrorcontainer'>
          <img src='logo-mainsite.png' alt='VisionAid logo' />
          <span className='autherrortext'>
            Access denied.&nbsp;
            <Link href='/' className='autherrorlink'>
              Please sign in with an active account.
            </Link>
          </span>
        </div>
      );
    } else {
        if (userResponse.role === "MANAGEMENT" || userResponse.role === "PM") {
          return (
          <>
            <div className={styles.mynavbar}>
              <Navbar user_role={userResponse.role} className={styles.navstudents} />
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
            <br />
            <div>
              <p className={styles.subtitlestudent}>
                Student: {studentName}
							</p>

              <Table columns={batchesColumns} tableData={dataResponse} isDelete={false} isEditable={false} Title={'Batches List'} FilterButton={true} />
            </div>
          </>
          );
        }
    }
}