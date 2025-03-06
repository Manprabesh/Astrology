import express from 'express';
import pool from './database.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import JsonWebToken from 'jsonwebtoken'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
    optionSuccessStatus: 200,

}

app.use(cors(corsOptions));


import createUserSchema from './models/userModel.js';
import createBloggingSchema from './models/bloggingModel.js';

//router
import router from './router/checkUserlogin.js';
import { createAccount } from './router/createAccount.js';
import loginRouter from './router/login.js';
import logoutRouer from './router/logout.js';
import getBlog from './router/getBlog.js';
app.use(router)
app.use(createAccount)
app.use(loginRouter)
app.use(logoutRouer)
app.use(getBlog)




try {
    app.post('/data', async (req, res) => {
        try {

            pool.query(createBloggingSchema);

            console.log(req.cookies.token);

            let decoded = JsonWebToken.verify(req.cookies.token, 'secretkey');
            const { data, heading } = req.body;
            console.log(decoded.email, "yoooo") // bar
            let email = decoded.email

            console.log("File is created");

            const user = await pool.query('SELECT * FROM userAccount')
            const length = user.rows.length
            console.log(length);

            const userId =  user.rows[length - 1].id


            console.log(typeof userId);

            try {
                const query = {
                    text: 'INSERT INTO blogging (content, heading, uploadedBy) VALUES($1, $2, $3) RETURNING *',
                    values: [[data], heading, userId]
                };
                console.log(query, "queries");

                const result = await pool.query(query);
                // console.log(result);

            } catch (err) {
                console.log(err);

            }

            return res.json("File uploaded")


        } catch (error) {
            // console.log(error);
            res.json("database error")

        }

    });
} catch (error) {
    console.log(error);
}


app.listen(3000, () => {
    console.log("Server running on port 3000");
});