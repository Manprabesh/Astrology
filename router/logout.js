import express from 'express'
const logoutRouter = express.Router()
import JsonWebToken from 'jsonwebtoken'

logoutRouter.get('/logout', (req, res) => {
    console.log(req.cookies.token);

    if(!req.cookies.token){
        return res.json("user has no logij")
    }

    var decoded = JsonWebToken.verify(req.cookies.token, 'secretkey');
    console.log(decoded) // bar
    if (decoded) {

        res.cookie("token","")
       return res.json("user is ready to logout")

    }
    else {
        // console.log("user is not login");
      return  res.json("user log out")
    }
})

export default logoutRouter