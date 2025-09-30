// src/components/LoginForm.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm({ onLogin }) {
  // 入力用 state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // エラー
  const [error, setError] = useState("");

  const navigate = useNavigate(); // 画面遷移用

  const handleSubmit = (e) => {
    e.preventDefault();

    // 仮ユーザー（後でAPI連携に差し替え）
    const mockUser = { username: "testuser", password: "password123" };

    if (username === mockUser.username && password === mockUser.password) {
      onLogin?.(username); // App.jsのログイン処理を呼ぶ
      navigate("/home"); // ホームへ遷移
    } else {
      setError("ユーザー名またはパスワードが正しくありません。");
    }
  };

  const goToSignUp = () => navigate("/signup");

  // --- 簡易スタイル ---
  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: 15,
    maxWidth: 400,
    margin: "20px auto",
  };
  const inputStyle = {
    padding: 10,
    fontSize: 16,
    width: "100%",
    boxSizing: "border-box",
  };
  const buttonStyle = {
    padding: 10,
    fontSize: 16,
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  };
  const linkButtonStyle = {
    padding: 10,
    fontSize: 16,
    backgroundColor: "transparent",
    color: "#007bff",
    border: "none",
    textDecoration: "underline",
    cursor: "pointer",
    textAlign: "center",
  };
  const errorStyle = { color: "red", fontSize: 12 };

  return (
    <form style={formStyle} onSubmit={handleSubmit}>
      <h2 style={{ textAlign: "center" }}>ToDoアプリ</h2>

      <input
        type="text"
        placeholder="ユーザー名"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={inputStyle}
      />
      <input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={inputStyle}
      />

      {error && <p style={errorStyle}>{error}</p>}

      <button type="submit" style={buttonStyle}>
        ログイン
      </button>
      <button type="button" style={linkButtonStyle} onClick={goToSignUp}>
        アカウント作成はこちら
      </button>
    </form>
  );
}

export default LoginForm;
