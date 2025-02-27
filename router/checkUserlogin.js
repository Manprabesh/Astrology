import express from 'express'
import cookieParser from 'cookie-parser';
const router = express.Router()
// import JsonWebToken from 'jsonwebtoken'
import JsonWebToken from 'jsonwebtoken';

// router.use(cookieParser())

router.get('/checkUserLogin', (req, res) => {
    console.log("Incoming data");

    // console.log(req.cookies.token);

    const data=req.cookies.token
    if(!data){
        // return
        return  res.json("user not login")
    }
    try {
        const decoded = JsonWebToken.verify(data, 'secretkey');
        console.log("decoded", decoded);
    } catch (error) {
        console.log(error);

    }


    if (!req.cookies || Object.keys(req.cookies).length === 0) {
        console.log("Empty cookie");
        res.json("user not login")

    } else {
        console.log("Cookies:", req.cookies);
        return res.json("doen")
    }


})

export default router