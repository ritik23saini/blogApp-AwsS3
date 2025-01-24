import React, { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Modal = ({ onPostCreated }) => {
    const [Post, setPost] = useState({
        title: "",
        content: "",
        Img: null,
    });

    const [loading, setLoading] = useState(false);
    const { userInfo } = useSelector((state) => state.user);

    const modelChange = () => {
        if (userInfo) {
            document.getElementById("my_modal_4").showModal();
        } else {
            toast.error("Login required");
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!Post.title || !Post.content) {
            toast.error("Please enter all fields");
            return;
        }

        if (!Post.Img) {
            toast.error("No image selected");
            return;
        }

        const formData = new FormData();
        formData.append("title", Post.title);
        formData.append("content", Post.content);
        formData.append("image", Post.Img);

        try {
            setLoading(true);
            const res = await axiosInstance.post("/api/posts", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (res.data) {
                toast.success("New Post created");
                setPost({ title: "", content: "", Img: null });
                document.getElementById("my_modal_4").close();

                // Call the parent-provided callback to refresh posts
                if (onPostCreated) {
                    onPostCreated();
                }
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button className="btn bg-white" onClick={modelChange}>
                Add Post <div className="badge rounded-full">+</div>
            </button>

            {userInfo && (
                <dialog id="my_modal_4" className="grid justify-center items-center modal">
                    <div className="modal-box w-96 max-w-5xl">
                        <label className="label">
                            <span className="label-text font-medium">Title</span>
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                value={Post.title}
                                onChange={(e) => setPost({ ...Post, title: e.target.value })}
                                disabled={loading}
                            />
                        </div>
                        <label className="label">
                            <span className="label-text font-medium">Content</span>
                        </label>
                        <div className="relative">
                            <textarea
                                className="input input-bordered h-96 w-full"
                                value={Post.content}
                                onChange={(e) => setPost({ ...Post, content: e.target.value })}
                                disabled={loading}
                            />
                        </div>
                        <div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setPost({ ...Post, Img: e.target.files[0] })}
                                disabled={loading}
                            />
                        </div>

                        <div className="flex justify-between modal-action">
                            <button
                                onClick={(e) => submitHandler(e)}
                                className="btn btn-outline btn-success"
                                disabled={loading}
                            >
                                {loading ? "Saving..." : "Save"}
                            </button>
                            <form method="dialog">
                                <button className="btn" disabled={loading}>
                                    Close
                                </button>
                            </form>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default Modal;
