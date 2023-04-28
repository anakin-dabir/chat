import express from "express";
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from 'cors'
import connectDb from "./db";
import authRoute from "./routes/auth";
import chatRoute from "./routes/chat";
import http from 'http'
import { Server } from 'socket.io'
import multer from "multer";
import { updateProf } from "./controllers/auth";

dotenv.config();
const app = express();
app.use(cors({
    origin: process.env.CLIENT, // replace with your frontend URL
    credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
export const upload = multer({ storage: storage }).single('image')

app.use('/photos', express.static('public'));
authRoute.post('/updateProfile', upload, updateProf);



app.use('/auth', authRoute);
app.use('/chat', chatRoute);
app.use('/', (req, res) => res.json({ msg: 'Hi' }));



// const otp = Math.floor(100000 + Math.random() * 900000);
// console.log(`Your OTP is: ${otp}`);

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT
    }
});
connectDb(process.env.MONGO_DB);


let users = [];
const addUser = (userId, socketId) => {
    !users.some(user => user.userId === userId)
        &&
        users.push({ userId, socketId });
}
const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
}
io.on('connection', async (socket) => {
    console.log('connected: ', socket.id);

    socket.on('connected', userID => {
        addUser(userID, socket.id);
        console.log(users);
        io.emit('getUsers', users);
    })


    socket.on('disconnect', () => {
        console.log(`Disconnected user with id: ${socket.id}`);
        removeUser(socket.id);
        io.emit('getUsers', users);
    });
})







server.listen(process.env.PORT, () => {
    console.log(process.env.SERVER);
})