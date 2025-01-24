import React from 'react'

const Skeleton = () => {
    return (
        <div className="flex w-96 flex-col mt-10 gap-7">
            <div className="skeleton h-40 w-full"></div>
            <div className="skeleton h-40 w-full"></div>
            <div className="skeleton h-40 w-full"></div>
        </div>
    )
}

export default Skeleton