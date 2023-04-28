import React from 'react'

const Card = () => {
    return (
        <div className="lg:w-1/4 md:w-1/2 p-4 w-full shadow-lg">
            <a className="block relative h-48 rounded overflow-hidden">
                <img alt="ecommerce" className="object-cover object-center w-full h-full block" src="https://dummyimage.com/420x260" />
            </a>
            <div className="mt-4">
                <h3 className="text-primary-content text-xs  tracking-widest   mb-1">CATEGORY</h3>
                <h2 className="text-base-content title-font text-xl font-medium">The Catalyzer</h2>
                <p className="mt-1 text-lg text-error">$16.00</p>
                <button className="btn btn-block mt-2 btn-primary">Add to Cart</button>
            </div>
        </div>
    )
}

export default Card