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






app.post('/data', async (req, res) => {
    try {
        const createTableQuery = `
        CREATE TABLE IF NOT EXISTS blogging(
            id SERIAL PRIMARY KEY,
            heading VARCHAR(30),
            content TEXT[],
        uploadedBy TEXT[]
        )`;

        await pool.query(createTableQuery);

        console.log(req.cookies.token);

        let decoded = JsonWebToken.verify(req.cookies.token, 'secretkey');
        const { data, heading } = req.body;
        console.log(decoded.email, "yoooo") // bar
        let email = decoded.email

        console.log("File is created");

        console.log(data);

        const query = {
            text: 'INSERT INTO blogging (content, heading, uploadedBy) VALUES($1, $2, $3) RETURNING *',

            values: [[data], heading, [email]]

        };

        console.log(query);

        const result = await pool.query(query);


        return res.json("File uploaded")


    } catch (error) {
        // console.log(error);
        res.json("database error")

    }

});


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

app.listen(3000, () => {
    console.log("Server running on port 3000");
});