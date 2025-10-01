// src/components/SignUpForm.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUpForm() {
  // フォームの状態
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // バリデーションエラー
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // 入力変更
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 送信
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.username)
      newErrors.username = "ユーザー名を入力してください。";
    if (!formData.email) newErrors.email = "メールアドレスを入力してください。";
    if (!formData.password)
      newErrors.password = "パスワードを入力してください。";

    setErrors(newErrors);

    // エラーなし → 仮登録完了 → /login へ
    if (Object.keys(newErrors).length === 0) {
      alert("アカウント作成が完了しました！（仮）");
      navigate("/login");
    }
  };

  // スタイル（簡易）
  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    margin: "0 auto",
    maxWidth: "400px",
  };
  const inputStyle = {
    padding: "10px",
    fontSize: "16px",
    width: "100%",
    boxSizing: "border-box",
  };
  const errorStyle = { color: "red", fontSize: "12px" };
  const buttonStyle = {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  };
  const linkButtonStyle = {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "transparent",
    color: "#007bff",
    border: "none",
    textDecoration: "underline",
    cursor: "pointer",
    textAlign: "center",
  };

  return (
    <form style={formStyle} onSubmit={handleSubmit}>
      {/* ユーザー名 */}
      <div>
        <input
          type="text"
          name="username"
          placeholder="ユーザー名"
          value={formData.username}
          onChange={handleInputChange}
          style={inputStyle}
        />
        {errors.username && <p style={errorStyle}>{errors.username}</p>}
      </div>

      {/* メール */}
      <div>
        <input
          type="email"
          name="email"
          placeholder="メールアドレス"
          value={formData.email}
          onChange={handleInputChange}
          style={inputStyle}
        />
        {errors.email && <p style={errorStyle}>{errors.email}</p>}
      </div>

      {/* パスワード */}
      <div>
        <input
          type="password"
          name="password"
          placeholder="パスワード"
          value={formData.password}
          onChange={handleInputChange}
          style={inputStyle}
        />
        {errors.password && <p style={errorStyle}>{errors.password}</p>}
      </div>

      <button type="submit" style={buttonStyle}>
        アカウント作成
      </button>

      {/* ログインに戻るリンク風ボタン */}
      <button
        type="button"
        style={linkButtonStyle}
        onClick={() => navigate("/login")}
      >
        ログイン画面に戻る
      </button>
    </form>
  );
}

export default SignUpForm;
