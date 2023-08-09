import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NewDream from "./pages/NewDream";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/newdream"
            element={
              <ProtectedRoute>
                <NewDream />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
