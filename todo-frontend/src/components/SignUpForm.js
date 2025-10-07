// src/components/SignUpForm.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/client"; // axios設定を読み込み

function SignUpForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 入力変更時の処理
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(""); // 入力時にエラーをリセット
  };

  // フォーム送信時の処理
  const handleSubmit = async (e) => {
    e.preventDefault(); // ページリロード防止
    try {
      await apiClient.post("/auth/signup", formData); // FastAPIに送信
      alert("アカウントが作成されました！ログイン画面に進んでください。");
      navigate("/login");
    } catch (err) {
      console.error("ERROR:", err.response?.data);
      const detail = err.response?.data?.detail;
      let message =
        "アカウント作成に失敗しました。入力内容を確認してください。";

      if (typeof detail === "string") {
        message = detail;
      } else if (Array.isArray(detail)) {
        // FastAPIのバリデーションエラー配列を整形して表示
        message = detail.map((d) => d.msg ?? JSON.stringify(d)).join("\n");
      }
      setError(message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        maxWidth: "400px",
        margin: "20px auto",
      }}
    >
      {/* ユーザー名 */}
      <input
        type="text"
        name="username"
        placeholder="ユーザー名"
        value={formData.username}
        onChange={handleChange}
        required
        style={{ padding: "10px", fontSize: "16px" }}
      />

      {/* メールアドレス */}
      <input
        type="email"
        name="email"
        placeholder="メールアドレス"
        value={formData.email}
        onChange={handleChange}
        required
        style={{ padding: "10px", fontSize: "16px" }}
      />

      {/* パスワード */}
      <input
        type="password"
        name="password"
        placeholder="パスワード（6〜72文字）"
        value={formData.password}
        onChange={handleChange}
        required
        maxLength={72}
        style={{ padding: "10px", fontSize: "16px" }}
      />

      {/* エラーメッセージ */}
      {error && <p style={{ color: "red", whiteSpace: "pre-line" }}>{error}</p>}

      {/* 送信ボタン */}
      <button
        type="submit"
        style={{
          padding: "10px",
          fontSize: "16px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        アカウント作成
      </button>

      {/* ログイン画面に戻る */}
      <button
        type="button"
        onClick={() => navigate("/login")}
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
        ログイン画面に戻る
      </button>
    </form>
  );
}

export default SignUpForm;
