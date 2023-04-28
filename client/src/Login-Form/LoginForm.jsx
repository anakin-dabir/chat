import React, { useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';



const LoginForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isRegisterChecked, SetIsRegisterChecked] = useState(false);
    const [isOrg, setIsOrg] = useState(false);
    const [data, setData] = useState({ name: '', email: '', isEmailValid: true, isNameValid: true, btnEnable: { email: false, name: false } });
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (name === 'email') {
            const isValid = emailRegex.test(value);
            setData(prev => { return { ...prev, isEmailValid: isValid, btnEnable: { ...prev.btnEnable, email: isValid } } });
        }
        if (name === 'name') {
            if (value === '') {
                setData(prev => { return { ...prev, isNameValid: false, btnEnable: { ...prev.btnEnable, name: false } } });
            }
            else {
                setData(prev => { return { ...prev, isNameValid: true, btnEnable: { ...prev.btnEnable, name: true } } });
            }
        }
        console.log(data);

    }

    const handleForm = async (e) => {
        e.preventDefault();
        const formData = data;
        formData.isOrg = isOrg;
        formData.login = isRegisterChecked;
        console.log(formData);
        setIsLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_API}/auth/register`, formData);
            const { body, msg, email } = response.data;
            toast.success(msg);

            console.log(body);

            if (localStorage.getItem('countdown')) localStorage.removeItem('countdown');
            localStorage.setItem('otp_key', JSON.stringify(body));


            // navigate(location.state.from);
            navigate(`/login/${email.replace(/^(.{2}).+@/, '$1*****@')}/${body}`, { state: { from: location.state?.from } });



        }
        catch (err) {
            toast.error(err.response.data.msg);
        }

        setIsLoading(false);
        const clearedData = { name: '', email: '', isEmailValid: true, isNameValid: true, btnEnable: { email: false, name: false } };
        setData(clearedData);
    }



    return (
        <>
            <div className="relative text-base-content bg-base-100  h-screen">
                <div className="absolute w-96 h-96 left-[30%] bg-[url(https://static.vecteezy.com/system/resources/previews/008/507/591/original/lens-flare-light-special-effect-free-png.png)] bg-contain blur-xl opacity-1"></div>
                <div className="relative sm:top-1/2 sm:-translate-y-1/2 container px-5 py-4 sm:py-24 mx-auto lg:max-w-screen-xl flex flex-wrap items-center justify-center">
                    <div className="relative lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0 !text-base-content">
                        <div className="absolute h-full w-full bg-[url(https://w7.pngwing.com/pngs/114/579/png-transparent-pink-cross-stroke-ink-brush-pen-red-ink-brush-ink-leave-the-material-text.png)] opacity-5 blur-lg "></div>
                        <div className="relative container px-5 text-center mx-auto">

                            <div className="xl:w-1/2 lg:w-3/4 w-full mx-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="inline-block w-8 h-8 mb-2" viewBox="0 0 975.036 975.036">
                                    <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                                </svg>
                                <p className="text-lg">
                                    Brand is just a perception, and perception will match reality over time. Sometimes it will be ahead, other times it will be behind. But brand is simply a collective impression some have about a product.
                                </p>
                                <div className="avatar">
                                    <div className="w-14 mt-4 rounded-full">
                                        <img src="https://cdn.vox-cdn.com/thumbor/WYZNb2sx7XuDb9ALk49LQtjF_IQ=/0x0:4000x2781/1400x1400/filters:focal(2000x1391:2001x1392)/cdn.vox-cdn.com/uploads/chorus_asset/file/22520460/1229901686.jpg" />
                                    </div>
                                </div>
                                <h2 className="font-medium text-2xl">~Elon Musk</h2>
                            </div>
                        </div>

                    </div>
                    <div className="lg:w-2/6 md:w-1/2 bg-primary bg-opacity-10 p-8 flex flex-col md:ml-auto w-full lg:mr-10 mt-10 md:mt-0">
                        <h2 className="text-base-content text-3xl font-bold mb-5">{isRegisterChecked ? 'Auth' : 'Register'}</h2>

                        {/* <div className="relative mb-5 w-full text-lg text-error">{ }</div> */}

                        <form onSubmit={handleForm}>
                            {!isRegisterChecked &&
                                <>
                                    <div className="form-control relative w-full">
                                        <label className="label cursor-pointer text-base-content">Registring as an Instructor/Institute
                                            <input value={isOrg} onChange={(e) => setIsOrg(e.target.checked)} type="checkbox" className="checkbox checkbox-primary" />
                                        </label>
                                    </div>

                                    <div className="form-control relative w-full">
                                        <label className="label">{isOrg ? 'Instructor/Institute Name' : 'Student Name'}</label>
                                        <input value={data.name} onChange={handleInputChange} type="text" name='name' placeholder="Name" className={`input peer/name w-full border-0 ${!data.isNameValid ? 'border-b-error name-invalid' : 'border-b-primary'} border-b-2 focus:outline-0`} />
                                        <label className=" peer-[.name-invalid]/name:label hidden text-error">Enter a name</label>
                                    </div>
                                </>

                            }
                            <div className="form-control mb-4 relative w-full">
                                <label className="label">Email</label>
                                <input value={data.email} onChange={handleInputChange} type="text" name='email' placeholder="Email" className={`input peer/email w-full border-0 ${!data.isEmailValid ? 'border-b-error err-email' : 'border-b-primary'} border-b-2 focus:outline-0`} />
                                <label className="peer-[.err-email]/email:label hidden text-error">Enter a valid email address</label>
                            </div>

                            <div className="form-control relative mb-5 w-full">
                                <label className="label cursor-pointer text-base-content">Already an Instructor/Institute
                                    <input value={isRegisterChecked} onChange={(e) => {
                                        SetIsRegisterChecked(e.target.checked);
                                        setIsOrg(false);
                                    }
                                    } type="checkbox" className="checkbox checkbox-primary" />
                                </label>
                            </div>

                            <button type='submit' className={`btn btn-block ${isLoading ? 'loading text-white' : 'btn-primary'} text-primary-content disabled:bg-[#0000006b] disabled:text-[#ffffff57]`}
                                disabled={isRegisterChecked ? data.btnEnable.email ? false : true : (data.btnEnable.email && data.btnEnable.name) ? false : true}>
                                {!isLoading ? (isRegisterChecked ? 'Login' : 'Register') : (isRegisterChecked ? 'Loging...' : 'Registering...')}
                            </button>

                        </form>
                    </div>
                </div>
            </div>

        </>






    )
}

export default LoginForm