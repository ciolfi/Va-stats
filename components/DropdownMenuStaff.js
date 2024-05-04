// Part of page group that populate a dynamic dropdown from MySQL:
// /db.js
// /pages/api/dropdownDataPm.js 
// /pages/api/dropdownDataStaff.js 
// /components/DropdownMenuStaff.js
// Author: Dante Ciolfi
// Last update: 5/4/2024

import React, { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';

const DropdownMenuStaff = ({id}) => {
    const [options, setOptions] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            // Dropdown options: ALL staSTAFF
            if (id == "dataentry") {
                const response = await fetch(process.env.NEXT_PUBLIC_API_URL + 'dropdownDataStaff');
                const data = await response.json();
                setOptions(data);
            }
            // Dropdown options: staff with 'PM' designation
            else if (id == "PM") {
                const response = await fetch(process.env.NEXT_PUBLIC_API_URL + 'dropdownDataPm');
                const data = await response.json();
                setOptions(data);
            }
        };
        fetchData();
    }, []);

    return (
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