import jwt from "jsonwebtoken";
import Otp from '../models/otp';
import User from '../models/user';
import nodemailer from 'nodemailer';


export const otpMail = async (email, jwt) => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log(`Your OTP is: ${otp}`);
    const newOtp = new Otp({ otp, jwt });
    try {
        await newOtp.save();
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'anakindabir@gmail.com', // replace with your email address
                pass: 'nbflqxbhrzdydppf' // replace with your email password or app-specific password
            }
        })

        const info = await transporter.sendMail({
            from: 'OTP-Verification <noreply@login.com>', // sender address
            to: `${email}`, // list of receivers
            subject: "OTP-Verification", // Subject line
            //text: "Hello world?", // plain text body
            html: `<p>Here is your OTP :) </p>
                <b><p>${otp}</p></b>`, // html body
        });
        return { msg: `OTP sent successfully`, body: newOtp._id.toString(), email }
    }
    catch (err) {
        throw new Error('Server');
    }
}
export const otpGeneration = async (req, res) => {
    const { email, login } = req.body;
    console.log(req.body);
    try {
        const getUser = await User.findOne({ email });
        if (login) {
            if (!getUser) return res.status(404).json({ msg: 'User not found', body: '' });
        }
        else {
            if (getUser) return res.status(404).json({ msg: 'User Already exists', body: '' });
        }
        const token = jwt.sign(req.body, process.env.JWT_SECRET);
        const response = await otpMail(email, token);
        console.log(response);
        return res.status(200).json(response);
    }
    catch (err) {
        return res.status(500).json({ msg: 'Server Error' });
    }
}

export const resendOTP = async (req, res) => {
    const { id } = req.body;
    try {
        const getOtp = await Otp.findById(id);
        const token = jwt.verify(getOtp.jwt, process.env.JWT_SECRET);
        const response = await otpMail(token.email, getOtp.jwt);
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ msg: 'Server Error' });
    }

}




export const loginRegister = async (req, res) => {
    const { id, otp } = req.body;
    try {
        const getOtp = await Otp.findById(id);
        if (otp != getOtp.otp) return res.status(404).json({ msg: 'Invalid Otp', body: '' });

        const token = jwt.verify(getOtp.jwt, process.env.JWT_SECRET);
        //Login
        const { email, name, login, isOrg } = token;
        console.log({ email, name, login, isOrg });

        const getUser = await User.findOne({ email });
        if (login) {
            const jwt_token = jwt.sign(getUser.toObject(), process.env.JWT_SECRET);
            res.cookie('jwt_token', jwt_token);
            return res.status(200).json({ msg: 'Login Successful', body: getUser });
        }
        const newUser = new User({ email, name, isOrg });
        await newUser.save();
        const jwt_token = jwt.sign(newUser.toObject(), process.env.JWT_SECRET);
        res.cookie('jwt_token', jwt_token);
        return res.status(201).json({ msg: 'Registered & Login Successful', body: newUser });

    }
    catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
}

export const logout = async (req, res) => {
    console.log('Trigerred...');
    console.log(req.user);
    res.clearCookie('jwt_token');
    res.status(200).json({ msg: 'Successfully logged out', body: '' });
}


export const getUserData = async (req, res) => {
    res.status(200).json({ body: req.user });
}

export const getAll = async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json({ body: users });
    }
    catch (err) {
        return res.status(500).json({ msg: 'Server Error' });
    }
}

export const Profile = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.id })
        return res.status(200).json({ body: user });
    }
    catch (err) {
        return res.status(500);
    }
}

export const updateProf = async (req, res) => {
    console.log(req);
    console.log(req.file);
    const { name, id } = req.body;
    try {
        const user = await User.findById(id);
        if (name !== '') {
            user.name = name;
        }
        user.img = req.file.originalname;
        await user.save();

        return res.status(200).json({ msg: 'Profile Updated', body: user })
    } catch (err) {
        return res.status(500).json({ msg: 'Server Error' });
    }
}