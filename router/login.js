import express from 'express'
const loginRouter = express.Router()
import pool from '../database.js'
import JsonWebToken from 'jsonwebtoken'

loginRouter.post('/login', (req, res) => {
    const { email, password } = req.body
    console.log(email);

    pool.query('SELECT email FROM userAccount WHERE email=$1', [email], (err, result) => {
        console.log(result.rows[0], "results");

        if (result.rows[0]) {

            console.log(result.rows);

            let token = JsonWebToken.sign({ email: email }, 'secretkey');
            res.cookie("token", token)
            console.log(token);



           res.json("User exist")

        }
        else {
            res.json("User don't exist")
        }
    })
})

export default loginRouter