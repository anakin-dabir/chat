import React from 'react'
import Card from './Card'

const Cards = () => {
    return (
        <section>
            <div className="container px-5 py-24 mx-auto lg:max-w-screen-xl">
                <div className="flex flex-wrap -m-12">


                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />


                </div>
            </div>
        </section>
    )
}

export default Cards