import express from 'express'
const getBlog = express.Router()
import pool from '../database.js'

import createBloggingSchema from '../models/bloggingModel.js'

getBlog.get('/getblog', async (req, res) => {

    try {

        const createTableQuery = `
        CREATE TABLE IF NOT EXISTS blogging(
            id SERIAL PRIMARY KEY,
            heading VARCHAR(30),
            content TEXT[],
        uploadedBy INT,
        CONSTRAINT fk_bloggingSchema FOREIGN KEY(uploadedBy) REFERENCES userAccount(id))`;

        await pool.query(createTableQuery)
        const email=await pool.query('SELECT blogging.id, email FROM blogging INNER JOIN useraccount ON blogging.uploadedby = useraccount.id')

        pool.query('SELECT * FROM blogging', (error, results) => {
            if (error) {
                throw error
            }

            console.log("results");

            res.status(200).json({data:results.rows,email:email.rows })
        })


    } catch (error) {

        console.log(error.message);

    }

})

export default getBlog