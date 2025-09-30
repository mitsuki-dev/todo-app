// src/components/SignUpForm.js
import React, { useState } from "react";

function SignUpForm() {
  // フォームの入力値
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // 入力エラーを保持
  const [errors, setErrors] = useState({});

  // 各入力の変化を反映（共通ハンドラ）
  const handleInputChange = (e) => {
    const { name, value } = e.target; // どのフィールドかと値
    setFormData((prev) => ({
      ...prev,
      [name]: value, // フィールド名に対応する値を更新
    }));
  };

  // 送信時の処理
  const handleSubmit = (e) => {
    e.preventDefault(); // ページリロード防止

    // 簡易バリデーション
    const newErrors = {};
    if (!formData.username)
      newErrors.username = "ユーザー名を入力してください。";
    if (!formData.email) newErrors.email = "メールアドレスを入力してください。";
    if (!formData.password)
      newErrors.password = "パスワードを入力してください。";

    setErrors(newErrors);

    // エラーが無ければ（仮）成功
    if (Object.keys(newErrors).length === 0) {
      alert("アカウント作成が完了しました！（仮）");
    }
  };

  // シンプルなインラインスタイル
  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    margin: "0 auto",
    maxWidth: "420px",
  };

  const inputStyle = {
    padding: "10px",
    fontSize: "16px",
    width: "100%",
    boxSizing: "border-box",
  };

  const errorStyle = {
    color: "red",
    fontSize: "12px",
    marginTop: "4px",
  };

  const buttonStyle = {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  };

  return (
    <form style={formStyle} onSubmit={handleSubmit}>
      {/* 見出し（任意） */}
      <h2 style={{ textAlign: "center" }}>ToDoアプリ</h2>

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

      {/* メールアドレス */}
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

      {/* 送信ボタン */}
      <button type="submit" style={buttonStyle}>
        アカウント作成
      </button>
    </form>
  );
}

export default SignUpForm;
