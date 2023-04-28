import React from 'react'

const Page = () => {
    return (
        <div className="w-screen h-screen flex justify-center -translate-y-4 items-center">
            <div className="text-center">
                <p className="text-xl font-bold text-error">{'<404/>'}</p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-base-content text-opacity-70 sm:text-5xl">Page not found</h1>
                <p className="mt-10 text-base leading-7 text-base-content">Sorry, we couldn’t find the page you’re looking for.</p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <a href="#" className="btn btn-primary">Go back home</a>
                </div>
            </div>
        </div>
    )
}

export default Page