import express from 'express'
import { tokenVerification } from './auth';

import User from '../models/user';
import Chat from '../models/Chat';
import Message from '../models/message';

const chatRoute = express.Router();
chatRoute.post('/newChat', tokenVerification, async (req, res) => {
    const { receiver, message } = req.body;

    try {
        let chat = await Chat.findOne({
            $or: [
                { user1: req.user, user2: receiver },
                { user1: receiver, user2: req.user }
            ]
        });

        if (chat) {
            const newMessage = new Message({
                sender: req.user,
                receiver,
                message,
            });
            await newMessage.save();
            chat.lastMessage = message;
            await chat.save();
            res.status(200).json({ body: newMessage });
        }
        else {
            const newMessage = new Message({
                sender: req.user,
                receiver,
                message,
            });
            await newMessage.save();
            const newChat = new Chat({
                user1: req.user,
                user2: receiver,
                lastMessage: message
            });
            await newChat.save();


            res.status(201).json({ body: newMessage });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});


chatRoute.post('/getChat', tokenVerification, async (req, res) => {
    try {
        const chats = await Chat.find({
            $or: [
                { user1: req.user },
                { user2: req.user }
            ]
        }).populate('user1').populate('user2')

        return res.status(200).json({ body: chats });

    }
    catch (err) {
        return res.status(500).json(err);
    }
})

chatRoute.post('/chats', tokenVerification, async (req, res) => {
    try {
        const myChats = await Message.find({
            $or: [
                { sender: req.user },
                { receiver: req.user }
            ]
        })

        // populate any other relevant fields

        return res.status(200).json({ body: myChats });
    }
    catch (err) {

    }

})

chatRoute.post('/getOtherUser', tokenVerification, async (req, res) => {
    try {
        const user = await User.findById(req.body.id);
        return res.status(200).json({ body: user });
    } catch (err) {
        return res.status(500);
    }
})

chatRoute.post('/getMessages', tokenVerification, async (req, res) => {
    try {
        const messages = await Message.find({
            $or: [
                { sender: req.user, receiver: req.body.id },
                { receiver: req.user, sender: req.body.id }
            ]
        })
        return res.status(200).json({ body: messages });
    } catch (err) {
        return res.status(500);
    }
})

export default chatRoute;

//user 1 '6447612730622fdacbef85ea'
//2 '6447618c30622fdacbef85f1'