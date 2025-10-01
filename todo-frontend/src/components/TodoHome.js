// src/components/TodoHome.js
import React from "react";

function TodoHome({ onLogout, username }) {
  const buttonStyle = {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    margin: "20px auto",
    display: "block",
  };

  const wrapStyle = {
    maxWidth: "600px",
    margin: "0 auto",
    textAlign: "center",
  };

  return (
    <div style={wrapStyle}>
      <h2>ようこそ！ToDoアプリへ{username ? `（${username}）` : ""}</h2>

      {/* ここに後でToDo一覧やフォームを載せていく予定 */}
      <p>（ここにToDo機能を実装していくよ）</p>

      <button style={buttonStyle} onClick={onLogout}>
        ログアウト
      </button>
    </div>
  );
}

export default TodoHome;
