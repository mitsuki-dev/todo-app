import React from "react";

function TodoHome({ onLogout, username }) {
  const containerStyle = {
    maxWidth: 600,
    margin: "20px auto",
    textAlign: "center",
  };
  const buttonStyle = {
    padding: 10,
    fontSize: 16,
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    margin: "20px auto",
    display: "block",
  };

  return (
    <div style={containerStyle}>
      <h2>ようこそ！ToDoアプリへ</h2>
      {username && <p>こんにちは、{username} さん</p>}
      <button style={buttonStyle} onClick={onLogout}>
        ログアウト
      </button>
    </div>
  );
}

export default TodoHome;
