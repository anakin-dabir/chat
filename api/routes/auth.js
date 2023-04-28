import express from "express";
import jwt from 'jsonwebtoken'
import {
    otpGeneration, resendOTP, otpMail, getUserData, getAll, Profile, updateProf,
    loginRegister, logout
} from "../controllers/auth";




export const tokenVerification = async (req, res, next) => {
    const token = req.cookies.jwt_token;

    if (!token) {
        return res.status(404).json({ msg: 'Unauthorized: No token provided.' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(404).json({ msg: 'Server Error' });
    }
}

const authRoute = express.Router();
authRoute.post('/register', otpGeneration);
authRoute.post('/resendOTP', resendOTP);
authRoute.post('/otpVerification', loginRegister);
authRoute.post('/logout', tokenVerification, logout);
authRoute.post('/getUserData', tokenVerification, getUserData);
authRoute.post('/getAll', tokenVerification, getAll);
authRoute.post('/profile', tokenVerification, Profile);





export default authRoute;