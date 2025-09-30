// src/components/SignUpForm.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUpForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.username)
      newErrors.username = "ユーザー名を入力してください。";
    if (!formData.email) newErrors.email = "メールアドレスを入力してください。";
    if (!formData.password)
      newErrors.password = "パスワードを入力してください。";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("アカウント作成が完了しました！（仮）");
      navigate("/login");
    }
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: 15,
    margin: "0 auto",
    maxWidth: 400,
  };
  const inputStyle = {
    padding: 10,
    fontSize: 16,
    width: "100%",
    boxSizing: "border-box",
  };
  const errorStyle = { color: "red", fontSize: 12 };
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

  return (
    <form style={formStyle} onSubmit={handleSubmit}>
      <h2 style={{ textAlign: "center" }}>ToDoアプリ</h2>

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
