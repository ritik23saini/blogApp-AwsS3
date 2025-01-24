import React from 'react'

const DetailCard = () => {
    return (
        <div className="card flex bg-base-100 shadow-xl">
            <figure>
                <img className='w-[1200px]'
                    src={'https://placehold.co/1200x600'}
                    alt={title}
                />
            </figure>
            <div className="card-body">
                {!updating ? (
                    <h2 className="card-title">{title}</h2>
                ) : (
                    <div>
                        <h2 className="card-title">Edit Title</h2>
                        <input
                            autoFocus
                            type="text"
                            value={title}
                            onChange={(e) =>
                                settitle(e.target.value)
                            }
                            className="input input-bordered card-title"
                        />
                    </div>
                )}

                {!updating ? (
                    <h2 className="card-content">{content}</h2>
                ) : (
                    <div>
                        <h2 className="card-title">Edit Content</h2>
                        <input
                            type="text"
                            value={content}
                            onChange={(e) =>
                                settitle(e.target.value)
                            }
                            className="input input-bordered card-title"
                        />
                    </div>
                )}
                <div className="grid grid-flow-col card-actions">
                    <button
                        onClick={() => (updating ? updatePost() : setUpdating(true))}
                        className="btn w-full btn-info"
                    >
                        {updating ? "Save" : "Edit"}
                    </button>
                    <button
                        onClick={() => deletePost()}
                        className={`btn w-full btn-error ${deleting ? "loading" : ""}`}
                        disabled={deleting}
                    >
                        {updating ? "Close" : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DetailCard