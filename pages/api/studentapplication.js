/*
This function is called from students.jsx (Students link).
student registration form.
*/

import { executeQuery } from "../../lib/db";

export default async function handler(req, res) {

    try {
        const body = req.body;
        const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
        // const isQualified = true;
        const data = await executeQuery({
            /* ---------- DATABASE MODIFICATION SECTION ------------- */
            // ORIG VERSION - NOT WORKING 
            // query: "INSERT INTO vastudents (id, email, name, simg, phone_number, gender, age,edu_qualifications, courses, location, objectives, vision_impairment, usable_vision, total_vision_loss, source, is_qualified, registration_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            // values: ['', body.email, body.name, body.simg, body.phone_number, body.gender, body.age, body.edu_qualifications, body.courses, body.location, body.objectives, body.vision_impairment, body.usable_vision, body.total_vision_loss, body.source, body.is_qualified, currentDate]

            // NEW VERSION (21 cols)
            // query: "INSERT INTO vastudents (id, email, name, phone_number, alt_ph_num, city, state, gender, age, edu_qualifications, employment_status, objectives, trainer_name, first_choice, second_choice, third_choice, visual_acuity, percent_loss, impairment_history, source, registration_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            // values: ['', body.email, body.name, body.phone_number, body.alt_ph_num, body.city, body.state, body.gender, body.age, body.edu_qualifications, body.employment_status, body.objectives, body.trainer_name, body.first_choice, body.second_choice, body.third_choice, body.visual_acuity, body.percent_loss, body.impairment_history, body.source, currentDate]

            // NO DROPDOWNS TEST: GENDER, EMP STATUS, VIS ACUITY (18 cols)
            // query: "INSERT INTO vastudents (id, email, name, phone_number, alt_ph_num, city, state, age, edu_qualifications, objectives, trainer_name, first_choice, second_choice, third_choice, percent_loss, impairment_history, source, registration_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            // values: ['', body.email, body.name, body.phone_number, body.alt_ph_num, body.city, body.state, body.age, body.edu_qualifications, body.objectives, body.trainer_name, body.first_choice, body.second_choice, body.third_choice, body.percent_loss, body.impairment_history, body.source, currentDate]

            // ORIG VERSION - TRY 
            query: "INSERT INTO vastudents (id, email, name, simg, phone_number, gender, age, edu_qualifications, courses, location, objectives, vision_impairment, usable_vision, total_vision_loss, source, is_qualified, registration_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            values: ['', body.email, body.name, '', body.phone_number, body.gender, body.age, body.edu_qualifications, body.courses, body.location, body.objectives, body.vision_impairment, body.usable_vision, body.total_vision_loss, body.source, isQualified, currentDate],
        });

    } catch (error) {
        console.log(error);
    }

    res.writeHead(301, {
        // Send user to blank Registration page
        Location: '/studentregistration'
        // Location: '/testreg'
    });
    res.end(); 
}
