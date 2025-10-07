import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/client";

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ログインフォームの送信処理
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await apiClient.post("/auth/login", {
        username: username.trim(),
        password,
      });

      const { token } = response.data; // { token: "..." } を想定
      localStorage.setItem("token", token);
      if (onLogin) onLogin(username.trim());
      navigate("/home");
    } catch (err) {
      // 返却エラーを安全に文字列化
      const detail = err?.response?.data?.detail;
      let msg =
        "ログインに失敗しました。ユーザー名またはパスワードを確認してください。";
      if (typeof detail === "string") {
        msg = detail;
      } else if (Array.isArray(detail)) {
        msg = detail.map((d) => d?.msg ?? JSON.stringify(d)).join("\n");
      } else if (err?.message && !err?.response) {
        // ネットワーク・CORS 等
        msg = `ネットワークエラー: ${err.message}`;
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        maxWidth: "400px",
        margin: "20px auto",
      }}
    >
      <input
        type="text"
        placeholder="ユーザー名"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
          if (error) setError("");
        }}
        required
        autoComplete="username"
        style={{ padding: "10px", fontSize: "16px" }}
      />

      <input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          if (error) setError("");
        }}
        required
        autoComplete="current-password"
        style={{ padding: "10px", fontSize: "16px" }}
      />

      {error && <p style={{ color: "red", whiteSpace: "pre-line" }}>{error}</p>}

      <button
        type="submit"
        disabled={loading}
        style={{
          padding: "10px",
          fontSize: "16px",
          backgroundColor: loading ? "#6c757d" : "#007bff",
          color: "#fff",
          border: "none",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "ログイン中..." : "ログイン"}
      </button>

      <button
        type="button"
        onClick={() => navigate("/signup")}
        style={{
          padding: "10px",
          fontSize: "16px",
          backgroundColor: "transparent",
          color: "#007bff",
          border: "none",
          textDecoration: "underline",
          cursor: "pointer",
        }}
      >
        アカウント作成はこちら
      </button>
    </form>
  );
}

export default LoginForm;
