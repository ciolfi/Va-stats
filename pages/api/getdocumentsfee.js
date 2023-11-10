// FILE CONTENTS: MySQL Documents and Fees table query

import mysql from "mysql2/promise";

export default async function handler(req, res) {
    const { batch_id } = req.body;
    const dbconnection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      database: process.env.MYSQL_DATABASE,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
    });

    try {
        const documentsQuery = `
            SELECT s.id, s.name, s.id_proof, s.disability_cert, s.photo, s.bank_details
            FROM vastudents s
            JOIN vastudent_to_batch sb ON s.id = sb.student_id
            WHERE sb.batch_id = ?
        `;

        const feesQuery = `
            SELECT student_id, fee_paid, amount_1, amount_2, amount_3, nature_of_fee
            FROM va_fees
            WHERE batch_id = ?
        `;

        const courseAndBatchNameQuery = `
            SELECT coursename, batch
            FROM vabatches
            WHERE id = ?
        `;

        const [documentsData] = await dbconnection.execute(documentsQuery, [batch_id]);
        const [feesData] = await dbconnection.execute(feesQuery, [batch_id]);
        const [courseAndBatchNameData] = await dbconnection.execute(courseAndBatchNameQuery, [batch_id]);

        res.status(200).json({
            documents: documentsData,
            fees: feesData,
            coursename: courseAndBatchNameData[0].coursename,
            batch: courseAndBatchNameData[0].batch,
        });
        dbconnection.end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
