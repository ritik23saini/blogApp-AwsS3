import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Skeleton from "../components/Skeleton";
import { setfilterPost } from "../store/postSlice";
import Modal from "../components/Modal";
import Card from "../components/Card";

const ProfilePage = () => {
    const dispatch = useDispatch();
    const { allPosts } = useSelector((state) => state.posts);
    const { userInfo } = useSelector((state) => state.user);

    const [loading, setLoading] = useState(true);
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        if (allPosts?.length > 0 && userInfo) {
            const filteredPosts = allPosts
                .filter((post) => post.userId === userInfo._id)
                .map((post) => ({
                    _id: post._id, // Ensure `_id` is included for key prop
                    title: post.title,
                    content: post.content,
                    imageUrl: post.imageUrl,
                    imageName: post.imageName,
                }));

            setUserPosts(filteredPosts);
            dispatch(setfilterPost(filteredPosts));
        }
        setLoading(false);
    }, [allPosts, userInfo, dispatch]);

    return (
        <div className="inline-grid lg:grid h-screen bg-base-200 p-10">
            <div className="flex justify-center gap-5 mt-10 items-center flex-wrap">
                <div className='text-3xl'>My posts</div>
                {loading ? (
                    <Skeleton />
                ) : userPosts && userPosts.length > 0 ? (
                    userPosts.map((post) => (
                        <Card key={post._id} post={post} />
                    ))
                ) : (
                    <div>No posts found</div>
                )}
            </div>

            <div className="min-w-40 grid justify-center items-center">
                <div className="flex items-center gap-2 rounded-full">
                    <Modal />
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
