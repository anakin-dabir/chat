import React from 'react'
import './Loader.css'

const Loader = () => {
    return (
        <div className="loader relative flex justify-center w-[100px] h-[100px] gap-[6px] items-center left-1/2 -translate-x-1/2">
            <span className='bg-base-content' />
            <span className='bg-base-content' />
            <span className='bg-base-content' />
            <span className='bg-base-content' />
        </div>

    )
}
export default Loader