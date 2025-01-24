import React from 'react';
import axiosInstance from '../utils/axios';
import { Link, useNavigate } from 'react-router-dom';
import { setError, setlogout } from "../store/userSlice";
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const { userInfo } = useSelector((state) => state.user);


    const logout = async () => {
        try {
            const res = await axiosInstance.post('api/logout');
            dispatch(setlogout());
            toast.success(res.data.message || 'Logout successful');
            navigate('/');
        } catch (error) {
            dispatch(setError(error.message || 'Logout failed'));
            toast.error('Logout failed. Please try again.');
        }
    };

    return (
        <div className="navbar bg-base-200">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl">Home</Link>
            </div>
            <div className="flex-none gap-2">

                {userInfo ? <div className="flex justify-center items-baseline">
                    <Link to="/profile" className="btn btn-ghost text-lg">My posts</Link>
                    <div className="form-control">
                        <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                    </div>
                </div> : null}


                {userInfo ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">

                                <img
                                    alt="User Avatar"
                                    src={userInfo.avatar || 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'}
                                />
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li><Link to="/profile">Profile</Link></li>
                            <li><button onClick={logout}>Logout</button></li>
                        </ul>
                    </div>
                ) : (
                    <div>
                        <Link to="/login" className="btn btn-ghost">Login</Link>
                        <Link to="/signup" className="btn btn-ghost">Sign Up</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
