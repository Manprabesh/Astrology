import express from 'express'
const getBlog = express.Router()
import pool from '../database.js'

getBlog.get('/getblog', async (req, res) => {

    try {
        const createTableQuery = `
        CREATE TABLE IF NOT EXISTS blogging(
            id SERIAL PRIMARY KEY,
            heading VARCHAR(30),
            content TEXT[],
        uploadedBy TEXT[]
        )`;


        await pool.query(createTableQuery)
        pool.query('SELECT * FROM blogging', (error, results) => {
            if (error) {
                throw error
            }
            res.status(200).json(results.rows)
        })
    } catch (error) {
        console.log(error.message);

    }

})

export default getBlog