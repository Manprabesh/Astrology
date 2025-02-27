import express from 'express'
const createAccount = express.Router()
import pool from '../database.js';
import JsonWebToken from 'jsonwebtoken';

createAccount.post('/createAccount', async (req, res) => {
    console.log("Account created");
    const { email, password } = req.body


    let token = JsonWebToken.sign({ email: email }, 'secretkey');


    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS userAccount(
        id SERIAL PRIMARY KEY,
       email VARCHAR(30),
        password VARCHAR(30)
    )`;

    await pool.query(createTableQuery)



    const em = email

    const data = await pool.query(
        'SELECT email FROM userAccount WHERE email = $1;',
        [em], (err, result) => {
            console.log(result.rows[0]);
            if (result.rows[0] == undefined) {
                res.cookie("token", token)
                if (email && password) {
                    const query = {
                        text: 'INSERT INTO userAccount (email, password) VALUES($1, $2) RETURNING *',

                        values: [email, password]
                    };

                    // console.log(query);

                    const result = pool.query(query);

                    console.log(token,"tpken");

                    res.json("Account created")
                }
                // return res.json("Account created")
            }
            else {
                return res.json("Account already exist")
            }

        }
    );


    // else {
    //     res.json("no data")
    // }

})

export { createAccount }