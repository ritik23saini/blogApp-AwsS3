import { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";
import Skeleton from "../components/Skeleton";
import Modal from "../components/Modal";
import toast from "react-hot-toast";
import { setallPosts } from "../store/postSlice";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";

const HomePage = () => {
  const dispatch = useDispatch();
  const { allPosts } = useSelector((state) => state.posts);
  const [Posts, setPosts] = useState(allPosts)

  useEffect(() => {
    const getallPost = async () => {
      try {
        const res = await axiosInstance.get("api/posts");
        if (res && res.data) {
          dispatch(setallPosts(res.data));
          return;
        }
        toast.error("Failed to load posts. Please try again later.");
      } catch (err) {
        toast.error("Failed to load posts. Please try again later.");
      }
    };
    getallPost();
  }, [ Posts]);

  return (
    <div className="grid w-full h-screen bg-base-200 p-10">
      <div className="flex justify-center gap-5 mt-10 items-center flex-wrap">
        {allPosts && allPosts.length > 0 ? (
          allPosts.map((post) => (
            <Card key={post._id} post={post} />
          ))
        ) : (
          <Skeleton />
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

export default HomePage;
