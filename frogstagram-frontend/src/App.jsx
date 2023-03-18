import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import ProfilePage from "./components/ProfilePage";
import UploadPage from "./components/UploadPage";
import UploadSuccess from "./components/UploadSuccess";
import UploadFailure from "./components/UploadFailure";

import AuthContext, { AuthProvider } from "./AuthContext";

import { useEffect, useContext } from "react";

import "./tailwind.css"; // Import Tailwind CSS

const NotFound = () => <div>Page not found</div>;

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                <UploadPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/upload/success"
            element={
              <ProtectedRoute>
                <UploadSuccess />
              </ProtectedRoute>
            }
          />
          <Route
            path="/upload/failure"
            element={
              <ProtectedRoute>
                <UploadFailure />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
