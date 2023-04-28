import axios from 'axios';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const Profile = () => {
    const { id } = useParams();
    const [state, setState] = useState({});
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);



    useEffect(() => {
        setLoading(true);
        (async () => {
            try {
                const response = await axios.post(`${import.meta.env.VITE_API}/auth/profile`, { id }, { withCredentials: true });
                const { body } = response.data;
                setState(body);
                setName(body.name);
                console.log(response);
                setLoading(false);
            }
            catch (err) {

            }

        })()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData();
        formData.append('image', file);
        formData.body.name = name;
        try {
            const response = await axios.post('http://localhost:9999/auth/updateProfile', formData, { withCredentials: true });
            const { msg, body } = response.data;
            toast.success(msg);

        }
        catch (err) {
            toast.error(err.response.data.msg);

        }
        setIsLoading(false);
    }

    return (
        <>
            <div className="container px-5 py-32 mx-auto flex flex-col">
                <div className="lg:w-4/6 mx-auto">
                    <div className="flex flex-col sm:flex-row mt-10">
                        <div className="sm:w-1/3  mx-auto text-center sm:pr-8 sm:py-8">
                            <div className="avatar">
                                <div className={`w-24 rounded-full ${!state.img && 'bg-black'}`}>
                                    {state.img && <img src={`http://localhost:9999/photos/${state.img}`} />}
                                </div>
                            </div>
                            <div className="flex flex-col items-center text-center justify-center">
                                <h2 className="font-medium title-font mt-8 text-base-content text-2xl">{state.name}
                                    {state.isOrg &&
                                        <div className="dropdown  dropdown-end md:dropdown-right">
                                            <label tabIndex={0} className="btn btn-circle btn-ghost btn-xs text-info">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                            </label>
                                            <div tabIndex={0} className="card bg-base-300 shadow-lg compact text-base-content dropdown-content rounded-box w-64">
                                                <div className="card-body">
                                                    <h2 className="card-title">Institute Member</h2>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </h2>
                                <div className="w-12 h-1 bg-primary rounded mt-2 mb-4" />
                                <p className="mt-4 text-lg"> {state.email}
                                    {/* email */}
                                </p>
                                <label htmlFor="my-modal-4" className=" mt-8 btn">Edit</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Pitchfork Kickstarter Taxidermy</h1>
                        <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table.</p>
                    </div>
                    <div className="flex flex-wrap -m-4">
                        <div className="xl:w-1/3 md:w-1/2 p-4">
                            <div className="border border-gray-200 p-6 rounded-lg">
                                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-6 h-6" viewBox="0 0 24 24">
                                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                    </svg>
                                </div>
                                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Shooting Stars</h2>
                                <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
                            </div>
                        </div>
                        <div className="xl:w-1/3 md:w-1/2 p-4">
                            <div className="border border-gray-200 p-6 rounded-lg">
                                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-6 h-6" viewBox="0 0 24 24">
                                        <circle cx={6} cy={6} r={3} />
                                        <circle cx={6} cy={18} r={3} />
                                        <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12" />
                                    </svg>
                                </div>
                                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">The Catalyzer</h2>
                                <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
                            </div>
                        </div>
                        <div className="xl:w-1/3 md:w-1/2 p-4">
                            <div className="border border-gray-200 p-6 rounded-lg">
                                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-6 h-6" viewBox="0 0 24 24">
                                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                                        <circle cx={12} cy={7} r={4} />
                                    </svg>
                                </div>
                                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Neptune</h2>
                                <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
                            </div>
                        </div>
                        <div className="xl:w-1/3 md:w-1/2 p-4">
                            <div className="border border-gray-200 p-6 rounded-lg">
                                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-6 h-6" viewBox="0 0 24 24">
                                        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7" />
                                    </svg>
                                </div>
                                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Melanchole</h2>
                                <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
                            </div>
                        </div>
                        <div className="xl:w-1/3 md:w-1/2 p-4">
                            <div className="border border-gray-200 p-6 rounded-lg">
                                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-6 h-6" viewBox="0 0 24 24">
                                        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                                    </svg>
                                </div>
                                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Bunker</h2>
                                <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
                            </div>
                        </div>
                        <div className="xl:w-1/3 md:w-1/2 p-4">
                            <div className="border border-gray-200 p-6 rounded-lg">
                                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-6 h-6" viewBox="0 0 24 24">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                    </svg>
                                </div>
                                <h2 className="text-lg text-gray-900 font-medium title-font mb-2">Ramona Falls</h2>
                                <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waist co, subway tile poke farm.</p>
                            </div>
                        </div>
                    </div>
                    <button className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Button</button>
                </div>
            </section> */}


            <input type="checkbox" id="my-modal-4" className="modal-toggle" />
            <label htmlFor="my-modal-4" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                    <h3 className="text-lg font-bold">Edit Profile</h3>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="mt-4 form-control">
                            <label className="label">Profile</label>
                            <input name='image' onChange={(e) => setFile(e.target.files[0])} type="file" className="file-input w-full max-w-xs" />
                        </div>
                        <div className="mt-4 form-control">
                            <label className="label">Name</label>
                            <input onChange={(e) => setName(e.target.value)} value={name} name='name' type="text" placeholder="Type here" className="input border-0 border-b-2 border-b-primary focus:outline-none w-full max-w-xs" />
                        </div>
                        <button type='submit' className={`mt-6 ${isLoading && 'loading'} btn`}>Save</button>
                    </form>
                </label>
            </label>


        </>
    )
}

export default Profile