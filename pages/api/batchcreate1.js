import { executeQuery } from "../../lib/db";

export default async function handler(req, res) {
	try {
		// Get data submitted in request body
		const body = req.body;

		// View response object in terminal
		//console.log('body: ', body);
		var coursedays;
		if (Array.isArray(body.coursedays)) {
			coursedays = body.coursedays.join("");
		} else {
			coursedays = body.coursedays;
		}
		const data = await executeQuery({

			/* ---------- DATABASE MODIFICATION SECTION ------------- */
			// If timestamp is a field, use: user.createdAt.Date (not toString)
			query: "INSERT INTO vabatches (id, coursename, batch, coursestart, courseend, coursedays, coursetimes, instructor, PM, TA, cost, currency, trainingmode, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
			values: ['', body.coursename, body.batch, body.coursestart, body.courseend, body.coursedays, body.coursetimestart+' - '+body.coursetimeend, body.instructor, body.PM, body.TA, body.cost, body.currency, body.trainingmode, 'UNSTARTED'],

		});
	} catch (error) {
		console.log(error);
	}
	// Redirect program flow back to Courses page
	// Thanks, Ruben Leija, for the tip that helped me here:
	// https://linguinecode.com/post/how-to-redirect-on-the-server-side-with-next-js
	res.writeHead(301, {
		Location: '/batches',
	});

	res.end();
}
