/*
This function is called from courses.jsx (Courses link).
It CREATES A COURSE.
*/

import { executeQuery } from "../../lib/db";

export default async function handler(req, res) {
	try {
		// Get data submitted in request body
		const body = req.body;

		// View response object in terminal
		// console.log('body: ', body);
		var coursedays;
		if (Array.isArray(body.coursedays)) {
			coursedays = body.coursedays.join("");
		} else {
			coursedays = body.coursedays;
		}
		const data = await executeQuery({
			/* ---------- DATABASE MODIFICATION SECTION ------------- */
			// If timestamp is a field, use: user.createdAt.Date (not toString)
			// NOTE: coursedays does is not a property of 'body' in query below;
			// Do not use body.coursedays just use coursedays
			query: "INSERT INTO vabatches (id, coursename, batch, coursestart, courseend, coursedays, coursetimes, instructor, PM, TA, dataentry, cost, currency, strength, trainingmode, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
			values: ['', body.coursename, body.batch, body.coursestart, body.courseend, coursedays, body.coursetimestart + ' - ' + body.coursetimeend, body.instructor, body.PM, body.TA, body.dataentry, body.cost, body.currency, body.strength, body.trainingmode, 'UNSTARTED'],
		});
		
	} catch (error) {
		console.log(error);
	}
	// Redirect program flow back to Courses page
	res.writeHead(301, {
		Location: '/batches',
	});

	res.end();
}