import React, { useCallback, useEffect } from 'react'
import './Chat.css';
import { useContext, useState } from 'react';
import { Context } from '../Provider';
import { BrowserRouter, Routes, Route, Outlet, Link } from 'react-router-dom';
import ChatBubble from './ChatBubble';
import axios from 'axios';
import { ChatContext } from './ChatRoutes';

const Chat = () => {
    const { provider } = useContext(Context);
    const { chat, setChat } = useContext(ChatContext);
    const [state, setState] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        (async () => {
            setIsLoading(true);
            try {
                const response = await axios.post(`${import.meta.env.VITE_API}/chat/getChat`, {}, { withCredentials: true });
                const { body } = response.data;
                setState(body);
                console.log(body);
                setIsLoading(false);
            } catch (err) {
            }
        })()
    }, []);

    const getUser = useCallback((chat) => {

        if (chat.user1._id !== provider.currentUser._id) {
            return { user: chat.user1 };
        }
        else if (chat.user2._id !== provider.currentUser._id) {
            return { user: chat.user2 }
        }

        return { user: chat.user1 };
    })






    return (
        <>
            <div className="h-screen w-full flex antialiased text-base-content bg-base overflow-hidden">
                <div className="flex-1 flex flex-col">
                    <main className="flex-grow flex flex-row min-h-0">
                        <section className="shadow bg-base-300 flex flex-col flex-none overflow-auto w-24 hover:w-64 group lg:max-w-sm md:w-2/5 transition-all duration-300 ease-in-out">

                            {/* header */}
                            <div className="header  p-4 flex flex-row justify-between items-center flex-none">
                                <div className="avatar online">
                                    <div className={`w-14 rounded-full ${!provider.currentUser.img && 'bg-black'}`}>
                                        {provider.currentUser.img && <img className='object-cover' src={`${import.meta.env.VITE_API}/photos/${provider.currentUser.img}`} />}
                                    </div>
                                </div>
                                <p className="text-xl font-semibold hidden md:block group-hover:block">Chats</p>

                            </div>

                            {/* search */}
                            <div className="   p-4 flex-none">
                                <form>
                                    <div className="relative">
                                        <label>
                                            <input type="text" placeholder="Type here" className="py-2 pr-6 pl-10 shadow-sm focus:outline-0 border-0 border-b-2 border-b-primary  input w-full" />
                                            <span className="absolute top-[4px] left-0 mt-2 ml-3 inline-block">
                                                <svg viewBox="0 0 24 24" className="w-6 h-6">
                                                    <path fill="#bbb" d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                                                </svg>
                                            </span>
                                        </label>
                                    </div>
                                </form>
                            </div>


                            {/* chats side */}
                            <ul className="menu flex-1  overflow-y-scroll">
                                {isLoading ? 'loading...' :

                                    state.map((chat) => {
                                        const { user } = getUser(chat);
                                        return (
                                            <li key={chat._id}>
                                                <Link to={`/chat/${user._id}`} className="flex  justify-between items-center  relative">
                                                    <div className="avatar online">
                                                        <div className={`w-14 rounded-full ${!user.img && 'bg-black'}`}>
                                                            {user.img && <img className='object-cover' src={`http://localhost:9999/${user.img}`} />}
                                                        </div>
                                                    </div>

                                                    <div className="flex-auto hidden min-w-0  md:block group-hover:block">
                                                        <p className="line-clamp-1 text-lg font-semibold">
                                                            {user.name}

                                                        </p>


                                                        <div className="flex items-center text-sm font-medium">
                                                            <div className="min-w-0">
                                                                <p className="line-clamp-1">{chat.lastMessage}</p>
                                                            </div>


                                                        </div>
                                                    </div>








                                                </Link>
                                            </li>
                                        )

                                    })


                                }

                                <li>
                                    {/* <NavLink to='/chat/abc' className="flex  justify-between items-center  relative">
                                        <div className="avatar online">
                                            <div className="w-14 rounded-full">
                                                <img className='object-cover' src="https://randomuser.me/api/portraits/men/97.jpg" />
                                            </div>
                                        </div>

                                        <div className="flex-auto hidden min-w-0  md:block group-hover:block">
                                            <p className="line-clamp-1 text-lg font-semibold">Tony Stark</p>


                                            <div className="flex items-center text-sm font-medium">
                                                <div className="min-w-0">
                                                    <p className="line-clamp-1">LED AS THE here?</p>
                                                </div>

                                                <p className="ml-2 whitespace-no-wrap">10min</p>
                                            </div>
                                        </div>








                                    </NavLink> */}
                                </li>
                            </ul>

















                        </section>

                        {/* chat box */}
                        <Outlet />


                    </main>
                </div>
            </div >




        </>
    )
}

export default Chat