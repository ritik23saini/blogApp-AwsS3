import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
    const { userInfo } = useSelector((state) => state.user);
    if (!userInfo) {
        return <Navigate to="/login" />;
    }
    return children;
};

export default ProtectedRoute;