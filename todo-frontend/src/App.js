// src/App.js
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginForm from "./LoginForm";
import SignUpForm from "./components/SignUpForm.js";
import TodoHome from "./components/TodoHome.js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const handleLogin = (name) => {
    setIsLoggedIn(true);
    setUsername(name);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
  };

  const appStyle = {
    maxWidth: 600,
    margin: "0 auto",
    padding: 20,
    boxSizing: "border-box",
  };

  return (
    <Router>
      <div style={appStyle}>
        <Routes>
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route
            path="/home"
            element={
              isLoggedIn ? (
                <TodoHome onLogout={handleLogout} username={username} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          {/* デフォルトは /login に飛ばす */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
