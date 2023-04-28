import React from 'react'

const HeroWithPic = () => {
    return (
        <div className="flex h-screen">
            <div className="flex items-center text-center lg:text-left px-8 md:px-12 lg:w-1/2">
                <div>
                    <h2 className="text-3xl font-semibold text-base-content md:text-4xl">Build Your New <span className="text-primary">Idea</span></h2>
                    <p className="mt-2 text-sm text-base-content text-opacity-70 md:text-base">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis commodi cum cupiditate ducimus, fugit harum id necessitatibus odio quam quasi, quibusdam rem tempora voluptates. Cumque debitis dignissimos id quam vel!</p>
                    <div className="flex justify-center lg:justify-start mt-6">
                        <a className="btn btn-primary">Get Started</a>
                    </div>
                </div>
            </div>
            <div className="hidden lg:block lg:w-1/2" style={{ clipPath: 'polygon(10% 0, 100% 0%, 100% 100%, 0 100%)' }}>
                <div className="h-full object-cover" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80)' }}>
                    <div className="h-full " />
                </div>
            </div>
        </div>

    )
}

export default HeroWithPic