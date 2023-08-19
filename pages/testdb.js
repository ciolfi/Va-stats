"use client";

import { useState, useEffect } from 'react';
//import mysql from 'mysql';
import mysql from 'mysql2';

const connection = mysql.createConnection({
  // host: 'localhost',
  // user: 'root',
  // password: '',
  // database: 'vastats1',
  // host: process.env.MYSQL_HOST,
  // user: process.env.MYSQL_USER,
  // password: process.env.MYSQL_PASSWORD,
  // database: process.env.MYSQL_DATABASE,

  host: 'MYSQL_HOST',
  user: 'MYSQL_USER',
  password: 'MYSQL_PASSWORD',
  database: 'MYSQL_DATABASE'
});
process.env["ERR_INVALID_STATE"] = 0;
export default function Home() {
  
  const [name, setName] = useState('');
  const [records, setRecords] = useState([]);

  const fetchRecords = () => {
    process.env["ERR_INVALID_STATE"] = 0;
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
    connection.query('SELECT * FROM records', (error, results) => {
      if (error) {
        console.error('Error fetching records:', error);
      } else {
        setRecords(results);
      }
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    connection.query('INSERT INTO records (name) VALUES (?)', [name], (error) => {
      if (error) {
        console.error('Error inserting record:', error);
      } else {
        fetchRecords();
        setName('');
      }
    });
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div>
      <h1>Record List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter a name"
        />
        <button type="submit">Add Record</button>
      </form>
      <ul>
        {records.map((record) => (
          <li key={record.id}>{record.name}</li>
        ))}
      </ul>
    </div>
  );
}
