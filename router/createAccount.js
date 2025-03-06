import express from 'express'
const createAccount = express.Router()
import pool from '../database.js';
import JsonWebToken from 'jsonwebtoken';
import createBloggingSchema from '../models/bloggingModel.js';
import createUserSchema from '../models/userModel.js';

createAccount.post('/createAccount', async (req, res) => {
    console.log("Account created");
    const { email, password } = req.body


    let token = JsonWebToken.sign({ email: email }, 'secretkey');

    pool.query(createUserSchema)

    const em = email

    const data =  pool.query(
        'SELECT email FROM userAccount WHERE email = $1;',

        [em], (err, result) => {


            if (result == undefined||result.rows[0]==undefined) {

                res.cookie("token", token)

                if (email && password) {
                    const query = {
                        text: 'INSERT INTO userAccount (email, password) VALUES($1, $2) RETURNING *',

                        values: [email, password]
                    };

                    const result = pool.query(query);

                    console.log(token,"tpken");

                    res.json("Account created")
                }

                }
            else {
                return res.json("Account already exist")
            }

        }
    );

})

export { createAccount }