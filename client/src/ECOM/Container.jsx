import React from 'react'
import Card from './Card'

const Container = () => {
    return (
        <div className="text-base-content body-font container mx-auto lg:max-w-screen-xl">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-wrap -m-4">

                    <Card />
                </div>
            </div>
        </div>
    )
}

export default Container