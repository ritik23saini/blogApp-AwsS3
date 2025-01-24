import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ post }) => {
    const navigate = useNavigate();
    const [imgLoading, setImgLoading] = useState(true);

    return (
        <div
            onClick={() => navigate(`/user-post/${post._id}`)}
            className=" card bg-base-100 w-96 shadow-xl hover:shadow-lg cursor-pointer"
        >
            <figure>
                {imgLoading && <span className="loading loading-spinner text-neutral"></span>}
                <img
                    className={`mt-5 ${imgLoading ? "blur-sm" : "blur-none"}`}
                    src={post.imageUrl}
                    alt={post.title}
                    onLoad={() => setImgLoading(false)}
                    onError={() => setImgLoading(false)}
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{post.title}</h2>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">View</button>
                </div>
            </div>
        </div>
    );
};

export default Card;
