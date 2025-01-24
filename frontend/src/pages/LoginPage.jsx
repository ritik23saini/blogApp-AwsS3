import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { setUserInfo, setLoading, setError } from "../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../utils/axios.js";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    if (!formData.email || !formData.password) {
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
        const res = await axiosInstance.post("/api/login", formData);

        if (res) {
          dispatch(setUserInfo(res.data));
          toast.success("Login successful!");
          dispatch(setLoading(false));
          navigate("/");
        }
      } catch (error) {
        
        dispatch(setLoading(false));
        toast.error(error.response.data.message);
        dispatch(setError(error.response.data.message));
      }
    }
  };

  return (
    <div className="h-screen grid justify-center items-center">
      <div className="min-w-96 max-w-4xl grid m-5">
        <form onSubmit={handleSubmit} className="m-5 space-y-6">
          <div className="text-2xl">Login Account</div>

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
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
              type={showPassword ? "text" : "password"}
              className={`input input-bordered w-full pl-10`}
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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

export default LoginPage;
