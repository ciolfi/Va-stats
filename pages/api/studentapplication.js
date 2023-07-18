/*
This function is called from students.jsx (Students link).
student registration form.
*/

import { executeQuery } from "../../lib/db";

// POPUP CODE
import { Alert } from "../../components/Alert";
import { alertService } from "../../services/alert.service";

export default async function handler(req, res) {

    try {
        const body = req.body;
        const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const isQualified = true;
        const data = await executeQuery({

            /* ---------- DATABASE MODIFICATION SECTION ------------- */
            query: "INSERT INTO vastudents (id, email, name, simg, phone_number, gender, age, edu_qualifications, courses, location, objectives, vision_impairment, usable_vision, total_vision_loss, source, is_qualified, registration_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            values: ['', body.email, body.name, '', body.phone_number, body.gender, body.age, body.edu_qualifications, body.courses, body.location, body.objectives, body.vision_impairment, body.usable_vision, body.total_vision_loss, body.source, isQualified, currentDate],
        });

    } catch (error) {
        console.log(error);
    }

    // POPUP CODE
    <Alert />;
    alertService.success('Success!!', options);

    // Redirect program flow back to Student Registration page
    res.writeHead(301, {
        Location: '/studentregistration',
    });
    res.end(); 
}
