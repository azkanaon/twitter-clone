import { Navigate, Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/auth/signup/SignUpPage";
import LoginPage from "./pages/auth/login/LoginPage";
import HomePage from "./pages/home/HomePage";
import Sidebar from "./components/common/Sidebar";
import RightPanel from "./components/common/RightPanel";
import ProfilePage from "./pages/profile/ProfilePage";
import NotificationPage from "./pages/notification/NotificationPage";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./components/common/LoadingSpinner";

function App() {
  const { data, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.error) return null;
        if (!res.ok) throw new Error(data.error || "Failed to fetch user");

        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }
  return (
    <div className="flex max-w-6xl mx-auto">
      {data ? <Sidebar /> : null}
      <Routes>
        <Route
          path="/"
          element={data ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!data ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!data ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/profile/:username"
          element={data ? <ProfilePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/notifications"
          element={data ? <NotificationPage /> : <Navigate to="/login" />}
        />
      </Routes>
      {data ? <RightPanel /> : null}
      <Toaster />
    </div>
  );
}

export default App;
