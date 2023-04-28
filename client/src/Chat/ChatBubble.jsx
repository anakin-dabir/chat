import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useContext } from 'react';
import { Context } from '../Provider';
import axios from 'axios';
import { io } from 'socket.io-client';
import moment from 'moment';


const ChatBubble = () => {
    const { provider } = useContext(Context);

    const socket = useRef();
    useEffect(() => {
        socket.current = io(import.meta.env.VITE_API);
    }, [])

    useEffect(() => {
        socket.current.emit('connected', provider.currentUser._id);
        socket.current.on('getUsers', data => {
            console.log(data);
        })
    }, [socket]
    )

    const { id } = useParams();

    const [otherUser, setOtherUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState([]);
    const [anotherLoader, setanotherLoader] = useState(false);
    useEffect(() => {
        (async () => {
            setIsLoading(true);
            try {
                const response = await axios.post('http://localhost:9999/chat/getOtherUser', { id }, { withCredentials: true });
                const { body } = response.data;
                setOtherUser(body);
                console.log(body);
                setIsLoading(false);

            }
            catch (err) { }

        })()
    }, [id])

    useEffect(() => {
        (async () => {
            setanotherLoader(true);
            try {
                const response = await axios.post('http://localhost:9999/chat/getMessages', { id }, { withCredentials: true });
                const { body } = response.data;
                setanotherLoader(false);
                setMessages(body);

            } catch (err) {

            }
        })()
    }, [id]);

    const getUser = useCallback((message) => {
        if (message.sender === provider.currentUser._id) {
            return { style: true, user: provider.currentUser }
        }
        return { style: false, user: otherUser };
    })

    const humanizeDate = (time) => {
        return moment(time).format('LT'); //LLL fromNow()
    }

    return isLoading ? 'loading...' : (
        <section className="flex flex-col flex-auto">
            {/* header */}
            <div className="chat-header bg-base-300 px-6 py-4 flex flex-row flex-none justify-between items-center shadow">
                <div className="flex">
                    {isLoading ? 'loading...' :
                        <>
                            <div className="avatar">
                                <div className={`w-12 rounded-full ${!otherUser.img && 'bg-black'}`}>
                                    {otherUser.img && <img className='object-cover' src={`${import.meta.env.VITE_KEY}/photos/${otherUser.img}`} />}
                                </div>
                            </div>
                            <div className="ml-4">
                                <p className="font-semibold text-lg">{otherUser.name}</p>
                            </div>
                        </>
                    }
                </div>
                <div className="flex">
                    <a href="#" className="block rounded-full w-10 h-10 p-2 ml-4">
                        <svg viewBox="0 0 20 20" className="w-full h-full fill-current text-primary">
                            <path d="M2.92893219,17.0710678 C6.83417511,20.9763107 13.1658249,20.9763107 17.0710678,17.0710678 C20.9763107,13.1658249 20.9763107,6.83417511 17.0710678,2.92893219 C13.1658249,-0.976310729 6.83417511,-0.976310729 2.92893219,2.92893219 C-0.976310729,6.83417511 -0.976310729,13.1658249 2.92893219,17.0710678 Z M9,11 L9,10.5 L9,9 L11,9 L11,15 L9,15 L9,11 Z M9,5 L11,5 L11,7 L9,7 L9,5 Z" />
                        </svg>
                    </a>
                </div>
            </div>

            {/* chats */}
            <div className="chat-body p-4 flex-1 overflow-y-scroll">
                {anotherLoader ? 'Loading ...' :

                    messages.map((message, i) => {
                        const { style, user } = getUser(message);
                        return (
                            <div key={i} className={`chat ${style ? 'chat-end' : 'chat-start'}`}>
                                <div className={`chat-image avatar`}>
                                    <div className={`w-10 rounded-full ${!user.img && 'bg-black'}`}>
                                        {user.img && <img src={`http://localhost:9999/photos/${user.img}`} />}
                                    </div>
                                </div>
                                <div className="chat-header">
                                    {user.name}

                                </div>
                                <div className="chat-bubble chat-bubble-primary">{message.message}</div>



                                <div className="chat-footer opacity-50">
                                    {humanizeDate(message.createdAt)}
                                </div>
                            </div>
                        )
                    })

                }


            </div>


            <Message setMessages={setMessages} socket={socket.current} user={provider.currentUser} />


        </section>
    )
}

export default ChatBubble;

const Message = ({ setMessages, user, socket }) => {
    const [newMessage, setNewMessage] = useState('');
    const sendMessage = () => {
        socket.emit('send_message', ({ userId: user._id, }))
        setMessages(prev => [...prev, { sender: user._id, message: newMessage, createdAt: new Date().toISOString() }]);
    }



    return (
        <div className="chat-footer bg-base-300 flex-none">
            <div className="flex flex-row items-center p-4">
                <button type="button" className="flex-shrink-0 focus:outline-none mx-2 block text-primary w-6 h-6">
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                        ></path>
                    </svg>
                </button>

                <div className="relative flex-grow">

                    <input onChange={(e) => setNewMessage(e.target.value)} type="text" placeholder="Type here" className=" border-0 border-b-2 border-b-primary input-md  shadow-xl focus:outline-none input w-full" />


                </div>
                <button onClick={sendMessage}
                    className="btn btn-primary rounded-full ml-4"
                >
                    <span>Send</span>
                    <span className="ml-2">
                        <svg
                            className="w-4 h-4 transform rotate-45 -mt-px"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path

                                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                            ></path>
                        </svg>
                    </span>
                </button>
            </div>
        </div>
    )
}