import React, { useEffect, useRef } from 'react'
import App from './App';
import { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

export const Context = React.createContext();
const Provider = () => {
    const [provider, setProvider] = useState({
        login: (Cookies.get('jwt_token') ? true : false),
        currentUser: {},
        allUsers: [],

    })
    useEffect(() => {
        if (provider.login === true) {
            (async () => {
                try {
                    const response = await axios.post(`${import.meta.env.VITE_API}/auth/getUserData`, {}, { withCredentials: true })
                    const { body } = response.data;
                    setProvider(prev => ({ ...prev, currentUser: body }));
                } catch (err) { };
            })()
        }
    }, [])
    console.log(provider);


    return (
        <>
            <Context.Provider value={{ provider, setProvider }}>
                <App />
            </Context.Provider >
        </>
    )
}

export default Provider;
