// src/App.js
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Header from "./components/Header.js";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import ToDoHome from "./components/ToDoHome";

function App() {
  // ログイン状態と表示名
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  // ログイン成功時に呼ぶ（LoginForm 側から渡される）
  const handleLogin = (name) => {
    setIsLoggedIn(true);
    setUsername(name);
  };

  // ログアウト
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
  };

  const appStyle = {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    boxSizing: "border-box",
  };

  return (
    <Router>
      <div style={appStyle}>
        <Header />
        <Routes>
          {/* ログイン画面（デフォルト想定） */}
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />

          {/* アカウント作成画面 */}
          <Route path="/signup" element={<SignUpForm />} />

          {/* ホームは保護ルート：未ログインなら /login に飛ばす */}
          <Route
            path="/home"
            element={
              isLoggedIn ? (
                <ToDoHome onLogout={handleLogout} username={username} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* それ以外のURLは /login へ */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
