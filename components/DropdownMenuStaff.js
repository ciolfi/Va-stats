// Part of 3 pages that populate a dynamic dropdown from MySQL:
// 1. /db.js
// 2. /pages/api/dropdownDataStaff.js 
// 3. /components/DropdownMenuStaff.js (This page)
// Author: Dante Ciolfi
// 4/26/2024

import React, { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';

// const DropdownMenuStaff = (id, name) => {
const DropdownMenuStaff = () => {
    const [options, setOptions] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL+'dropdownDataStaff');
            const data = await response.json();
            setOptions(data);
        };
        fetchData();
    }, []);

    return (
        // <select className={styles.addstaffforminputsbox} id={id} name={name}>
        <select className={styles.addstaffforminputsbox} id="dataentry" name="dataentry">
            {options.map((option) => (
                <option
                    key={option.id}
                    value={option.value}>
                    {option.firstname} {option.lastname} 
                </option>
            ))}
        </select>
    );
};

export default DropdownMenuStaff;