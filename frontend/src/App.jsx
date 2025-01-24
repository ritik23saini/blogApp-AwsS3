import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import DisplayPost from "./pages/DisplayPost";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";

function App() {
  const { userInfo } = useSelector((state) => state.user);

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={!userInfo ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!userInfo ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/user-post/:id" element={<DisplayPost />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
