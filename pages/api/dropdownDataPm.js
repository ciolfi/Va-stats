// Part of page group that populate a dynamic dropdown from MySQL:
// /db.js
// /pages/api/dropdownDataPm.js 
// /pages/api/dropdownDataStaff.js 
// /components/DropdownMenuStaff.js
// Author: Dante Ciolfi
// Last update: 5/4/2024

import connection from '../../db';

export default async (req, res) => {
    connection.query("SELECT * FROM vausers where designation = 'Program Manager'", function (error, results, fields) {
      if (error) throw error;
      res.status(200).json(results, fields);
    });
};