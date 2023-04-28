import React from 'react'
import { useContext } from 'react'
import { Context } from '../Provider'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'


const Logout = () => {
    const navigate = useNavigate();
    const { setProvider } = useContext(Context);
    const handleLogout = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API}/auth/logout`, {}, { withCredentials: true });
            const { msg } = response.data;
            localStorage.clear();
            toast.success(msg);
            setProvider(prev => ({ ...prev, currentUser: {}, login: false, allUsers: [] }));
            // navigate('/');
        }
        catch (err) {
            toast.error(err.response.data.msg);
        }
    }
    const handle = (e) => {
        console.log(e.clientX, e.clientY)
    }
    return (
        <div onMouseMove={handle} className="h-screen w-screen">
            <button onClick={handleLogout} className="btn-wide btn-primary">
                Logout
            </button>
        </div>
    )
}

export default Logout