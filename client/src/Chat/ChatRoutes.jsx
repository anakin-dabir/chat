import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Chat from './Chat'
import ChatBubble from './ChatBubble'
import axios from 'axios'
import { Context } from '../Provider'
import { useContext } from 'react'


export const ChatContext = React.createContext();
const ChatRoutes = () => {
    // const { setProvider, provider } = useContext(Context);
    // const [chat, setChat] = useState({ chats: [] });
    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const response = await axios.post(`${import.meta.env.VITE_API}/auth/getAll`, {}, { withCredentials: true });
    //             const { body } = response.data;
    //             setProvider(prev => ({ ...prev, allUsers: [...prev.allUsers, body] }));
    //         } catch (err) {
    //             console.log(err.response.data.msg)
    //         }
    //     })()
    // }, []);

    return (
        <ChatContext.Provider value={{}}>
            <Routes>
                <Route path='/' element={<Chat />}>
                    <Route path='/:id' element={<ChatBubble />} />
                </Route>
                <Route path='*' element={<>404</>} />
            </Routes>
        </ChatContext.Provider>
    )
}

export default ChatRoutes