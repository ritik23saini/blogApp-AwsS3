import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo, setLoading, setError } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axios.js";

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Select userInfo and loading state from Redux store
    const { userInfo, loading } = useSelector((state) => state.user);

    // If the user is already logged in, redirect to home page
    if (userInfo) {
        navigate("/");
    }

    const validateForm = () => {
        if (!formData.fullName || !formData.password || !formData.email) {
            toast.error("Please enter all fields.");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validateForm();

        if (isValid) {
            dispatch(setLoading(true)); 
            try {
                const res = await axiosInstance.post("/api/register", formData);

                if (res) {
                    dispatch(setUserInfo(res.data)); 
                    toast.success("Registered successfully!");
                    dispatch(setLoading(false)); 
                    navigate("/login");
                }
            } catch (err) {
                dispatch(setLoading(false)); 
                toast.error(err.response.data.message);
                dispatch(setError(err.response.data.message)); 
            }
        }
    };

    return (
        <div className="h-screen grid justify-center items-center">
            <div className="min-w-96 max-w-4xl grid m-5 ">
                <form className="m-5 space-y-6" onSubmit={handleSubmit}>
                    <div className="text-2xl">Register Account</div>

                    <label className="label">
                        <span className="label-text font-medium">Full Name</span>
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="size-5 text-base-content/40" />
                        </div>
                        <input
                            type="text"
                            autoFocus={true}
                            className={`input input-bordered w-full pl-10`}
                            placeholder="John Doe"
                            value={formData.fullName}
                            onChange={(e) =>
                                setFormData({ ...formData, fullName: e.target.value })
                            }
                        />
                    </div>

                    <label className="label">
                        <span className="label-text font-medium">Email</span>
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="size-5 text-base-content/40" />
                        </div>
                        <input
                            type="email"
                            className={`input input-bordered w-full pl-10`}
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                        />
                    </div>

                    <label className="label">
                        <span className="label-text font-medium">Password</span>
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="size-5 text-base-content/40" />
                        </div>
                        <input
                            autoComplete=""
                            type={showPassword ? "text" : "password"}
                            className={`input input-bordered w-full pl-10`}
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({ ...formData, password: e.target.value })
                            }
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <EyeOff className="size-5 text-base-content/40" />
                            ) : (
                                <Eye className="size-5 text-base-content/40" />
                            )}
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-full"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Create Account"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUpPage;
