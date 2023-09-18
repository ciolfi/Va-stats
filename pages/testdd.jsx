"use client";

// const getPostsData = async () => {
//   // const res = await fetch ("https://my-json-server.typicode.com/typicode/demo/posts");
//   const res = await fetch ("https://jsonplaceholder.typicode.com/typicode/demo/posts");
//   return res.json([]);
// }

const getCoursesData = async () => {
  // const response = await fetch('https://reqbin.com/echo/get/json');
  
  const res = await fetch (process.env.NEXT_PUBLIC_API_URL + 'getcoursesdata-test');
  // const res = await fetch ('http://localhost:3000/api/getcoursesdata-test.js');

  // const json = await response.json();
  // console.log("Response contents", res.json());
  return res.json();
};

export default async function TestDD(){
  const vacourses = await getCoursesData();
  // const vacourses = [{id: 1, course: 'python'}, {id: 2, course: 'C'}];
  // const vacourses = Array.from([{id: 1, course: 'python'}, {id: 2, course: 'C'}]);
  console.log("Front-end data: ", vacourses);
  
  return (
    <div>
      {Array.from(vacourses).map((courses) => {
      // {vacourses.map((courses) => {
        return <p key={vacourses.id}>{courses.course}</p>;
      })}
    </div>
  );
}

// export default async function TestDD(){
//   const posts = await getPostsData();
//   return (
//     <div>
//       {posts.map((post) => {
//         return <p> {post.title}</p>;
//       })}
//     </div>
//   );
// }
