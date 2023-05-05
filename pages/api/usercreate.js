/*
This function is called from students.jsx (Students link).
student registration form.
*/

import { executeQuery } from "../../lib/db";

export default async function handler(req, res) {
	try {
		// Get data submitted in request body
		const body = req.body;

		// View response object in terminal
        //console.log('BODY****: ', body);
        
		const data = await executeQuery({

			/* ---------- DATABASE MODIFICATION SECTION ------------- */
			// If timestamp is a field, use: user.createdAt.Date (not toString)
			query: "INSERT INTO vausers (id, email, firstname, lastname, role, isactive ) VALUES (?, ?, ?, ?,?,?)",
			values: [body.id, body.email, body.firstname, body.lastname, body.role, '1'],
		});

	} catch (error) {
		console.log(error);
	}
	// Redirect program flow back to Courses page
	// Thanks, Ruben Leija, for the tip that helped me here:
	// https://linguinecode.com/post/how-to-redirect-on-the-server-side-with-next-js
	res.writeHead(301, {
		Location: '/users',
	});

	res.end();
}
