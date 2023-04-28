import React from 'react'

const Form = () => {
    return (
        <section className="relative">
            <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
                <div className="lg:w-2/3 md:w-1/2 bg-base-100 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
                    <iframe width="100%" height="100%" title="map" className="absolute inset-0" src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=%C4%B0zmir+(My%20Business%20Name)&ie=UTF8&t=&z=14&iwloc=B&output=embed" style={{ filter: 'grayscale(1) contrast(1.2) opacity(0.16)' }} />
                    <div className="bg-base-100 relative flex flex-wrap py-6 rounded shadow-md">
                        <div className="lg:w-1/2 px-6">
                            <h2 className="title-font font-semibold text-base-content tracking-widest text-xs">ADDRESS</h2>
                            <p className="mt-1">Photo booth tattooed prism, portland taiyaki hoodie neutra typewriter</p>
                        </div>
                        <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
                            <h2 className="title-font font-semibold text-base-content tracking-widest text-xs">EMAIL</h2>
                            <a className="text-primary leading-relaxed">example@email.com</a>
                            <h2 className="title-font font-semibold text-base-content tracking-widest text-xs mt-4">PHONE</h2>
                            <p className="leading-relaxed">123-456-7890</p>
                        </div>
                    </div>
                </div>
                <div className=" lg:w-1/3 md:w-1/2 flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
                    <h2 className="text-base-content text-3xl mb-1 font-bold title-font">Feedback</h2>
                    <div className="form-control relative  w-full">
                        <label className="label">Name</label>
                        <input type="text" placeholder="Name" className={`input border-opacity-20 input-primary w-full focus:outline-0`} />
                        {/* <label className="label text-error">{emailError}</label> */}
                    </div>
                    <div className="form-control relative  w-full">
                        <label className="label">Email</label>
                        <input type="text" placeholder="Email" className={`input input-primary border-opacity-20 w-full focus:outline-0`} />
                        {/* <label className="label text-error">{emailError}</label> */}
                    </div>
                    <div className="form-control relative mb-4 w-full">
                        <label className="label">Message</label>
                        <textarea placeholder="Message..." className={`textarea h-44 border-opacity-20 textarea-primary w-full focus:outline-0`} />
                        {/* <label className="label text-error">{emailError}</label> */}
                    </div>

                    <button className="btn btn-primary btn-block">Send</button>

                </div>
            </div>
        </section>
    )
}

export default Form