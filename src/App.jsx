import React from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Home/Home";
import Signin from "./pages/Signin/Signin";
import Signup from "./pages/Signup/Signup";
import Profile from "./pages/Profile/Profile";
import Recovery from "./pages/Recovery/Recovery";
import Password from "./pages/Password/Password";
import PrivateRoutes from "./utils/PrivateRoutes";
import PublicRoutes from "./utils/PublicRoutes";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<PublicRoutes />}>
            <Route path="/" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/recovery" element={<Recovery />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>

          <Route element={<PrivateRoutes />}>
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/password" element={<Password />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
