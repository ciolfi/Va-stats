// Part of 4 pages that populate a dynamic dropdown from MySQL:
// 1. /db.js
// 2. /pages/api/dropdownDataStaff.js (This page)
// 3. /components/DropdownMenuStaff.js
// Author: Dante Ciolfi
// 4/26/2024

import connection from '../../db';

export default async (req, res) => {
  connection.query('SELECT * FROM vausers', function (error, results, fields) {
    if (error) throw error;
    res.status(200).json(results, fields);
  });
};