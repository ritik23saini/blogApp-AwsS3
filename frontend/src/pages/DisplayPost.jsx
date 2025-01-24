import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../utils/axios";
import { setfilterPost } from "../store/postSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const DisplayPost = () => {
    const dispatch = useDispatch();
    const { allPosts } = useSelector((state) => state.posts);
    const { id } = useParams();

    const [Post, setPost] = useState({
        title: "",
        content: "",
        imageUrl: null,
    });
    const [imagePreview, setImagePreview] = useState(null);

    const [updating, setUpdating] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
            setPost({ ...Post, imageName: file });
        }
    };

    useEffect(() => {
        if (allPosts) {
            const filteredPost = allPosts.find((post) => post._id === id);
            if (filteredPost) {
                dispatch(setfilterPost(filteredPost));
                setPost(filteredPost);
            }
        }
    }, [allPosts, id, dispatch]);

    const updatePost = async () => {
        if (!Post.title || !Post.content) {
            toast.error("Please enter all fields");
            return;
        }

        const formData = new FormData();
        formData.append("title", Post.title);
        formData.append("content", Post.content);

        if (Post.imageName) formData.append("image", Post.imageName);

        try {
            const res = await axiosInstance.put(`/api/posts/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (res) {
                dispatch(setfilterPost(res.data));
                toast.success("Post updated successfully!");
                setImagePreview(null);
                setUpdating(false);
                setPost({ ...Post, imageName: null });
            }
        } catch (err) {
            console.error("Error updating post:", err);
            toast.error(err.response?.data?.message || "Something went wrong!");
        }
    };

    const deletePost = async () => {
        try {
            setDeleting(true);
            await axiosInstance.delete(`/api/posts/${id}`);
            toast.success("Post deleted successfully!");
        } catch (error) {
            console.error("Error deleting post:", error);
            toast.error(error.response?.data?.message || "Failed to delete post.");
        } finally {
            setDeleting(false);
        }
    };

    return (
        <div className="flex m-5 items-center justify-center">
            {id ? (
                <div className="card max-w-screen-xl p-4 bg-base-100 shadow-xl">
                    <figure className="card-body">
                        <img
                            className=""
                            src={imagePreview || Post.imageUrl || "default-image.jpg"}
                            alt={Post.title || "No title"}
                        />
                    </figure>
                    <div className="p-2">
                        {!updating ? (
                            <h2 className="my-3 card-title">{Post.title}</h2>
                        ) : (
                            <div>
                                <h2 className="mt-3 card-title">Edit Title</h2>
                                <input
                                    autoFocus
                                    type="text"
                                    value={Post.title}
                                    onChange={(e) =>
                                        setPost({ ...Post, title: e.target.value })
                                    }
                                    className="input input-bordered card-title"
                                />
                            </div>
                        )}

                        {!updating ? (
                            <p className="my-3">{Post.content}</p>
                        ) : (
                            <div>
                                <h2 className="my-3 card-title">Edit Content</h2>
                                <textarea
                                    value={Post.content}
                                    onChange={(e) =>
                                        setPost({ ...Post, content: e.target.value })
                                    }
                                    className="my-3 w-full h-60 input input-bordered"
                                />
                                <input type="file" accept="image/*" onChange={handleImageChange} />
                            </div>
                        )}

                        <div className="my-3 grid grid-flow-col card-actions">
                            <button
                                onClick={() => (updating ? updatePost() : setUpdating(true))}
                                className='my-3 btn w-full btn-info '
                            >
                                {updating ? "Save" : "Edit"}
                            </button>
                            <button
                                onClick={() => setUpdating(false)}
                                className={`my-3 btn w-full btn-warning ${updating ? "" : "hidden"}`}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={deletePost}
                                className={`btn my-3 w-full btn-error ${deleting ? "loading" : ""}`}
                                disabled={deleting}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Not Found</p>
            )}
        </div>
    );
};

export default DisplayPost;
