import React from 'react'
import Card from './Card'

const Cards = () => {
    return (
        <section>
            <div className="container px-5 py-24 mx-auto lg:max-w-screen-xl">
                <div className="-my-8 divide-y-2 divide-base-content">

                    <Card />
                    <Card />
                    <Card />

                </div>
            </div>
        </section>
    )
}

export default Cards