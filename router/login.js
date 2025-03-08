import express from 'express'
const loginRouter = express.Router()
import pool from '../database.js'
import JsonWebToken from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import createBloggingSchema from '../models/bloggingModel.js'
import createUserSchema from '../models/userModel.js'

loginRouter.post('/login', (req, res) => {
    const { email, password } = req.body
    console.log(email);

    pool.query(createUserSchema)

    const data = pool.query('SELECT email,password FROM userAccount WHERE email=$1', [email], (err, result) => {

        if (!result) {
            return res.json("user don't exist")
        }

        const hash=result.rows[0].password;


        if (result.rows[0]) {

            console.log(result.rows);

            let token = JsonWebToken.sign({ email: email }, 'secretkey');

            bcrypt.compare(password, hash, function (err, result) {
                if (result) {
                    res.cookie("token", token)
                    console.log(token);

                    return res.json("User exist")
                }
                else {
                    return res.json("User don't exist")
                }
            });


        }
        else {
          return  res.json("User don't exist")
        }
    })
    console.log(data, "data");

})

export default loginRouter