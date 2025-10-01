// src/components/ToDoHome.js
import React, { useState } from "react";

function ToDoHome({ onLogout, username }) {
  // タスク一覧
  const [tasks, setTasks] = useState([]);

  // フォーム入力
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  // エラー & 通知
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");

  // 追加ボタン
  const handleAddTask = (e) => {
    e.preventDefault();

    // タイトル: 1〜25文字
    const t = title.trim();
    if (t.length === 0 || t.length > 25) {
      setError("タイトルは1文字以上、25文字以内で入力してください。");
      return;
    }

    // 詳細: 必須
    const d = details.trim();
    if (d.length === 0) {
      setError("詳細を入力してください。");
      return;
    }

    // エラー解除
    setError("");

    // 現在日時（表示用）
    const currentDateTime = new Date().toLocaleString();

    // 新しいタスク
    const newTask = {
      id: Date.now(), // 一意のID
      title: t,
      details: d,
      createdAt: currentDateTime,
      updatedAt: currentDateTime,
    };

    // リストに追加
    setTasks((prev) => [...prev, newTask]);

    // 入力リセット
    setTitle("");
    setDetails("");

    // 通知（3秒で消える）
    setNotification("タスクが追加されました！");
    setTimeout(() => setNotification(""), 3000);
  };

  // ログアウト
  const handleLogout = () => {
    setTasks([]); // 表示用をクリア（任意）
    onLogout(); // 親から渡されたログアウト処理を実行
  };

  // --- style（簡易） ---
  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  };

  const wrapStyle = {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    boxSizing: "border-box",
  };

  const buttonStyle = {
    padding: "10px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxSizing: "border-box",
  };

  const submitStyle = {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    marginTop: "10px",
  };

  return (
    <div style={wrapStyle}>
      {/* ヘッダー */}
      <header style={headerStyle}>
        <div>{username}でログイン中</div>
        <button style={buttonStyle} onClick={handleLogout}>
          ログアウト
        </button>
      </header>

      {/* 追加フォーム */}
      <form onSubmit={handleAddTask} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="タスクタイトル（25文字以内）"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
        />
        <textarea
          placeholder="タスク詳細"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          rows="4"
          style={inputStyle}
        />
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        <button type="submit" style={submitStyle}>
          追加
        </button>
      </form>

      {/* 通知 */}
      {notification && (
        <p style={{ color: "green", marginBottom: "20px" }}>{notification}</p>
      )}

      {/* タスクリスト */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              borderBottom: "1px solid #ddd",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              backgroundColor: "#f8f9fa",
            }}
          >
            <h3 style={{ margin: "0 0 5px 0" }}>{task.title}</h3>
            <p style={{ margin: "0 0 5px 0" }}>{task.details}</p>
            <small style={{ display: "block", color: "#888" }}>
              作成日時: {task.createdAt}
            </small>
            <small style={{ display: "block", color: "#888" }}>
              更新日時: {task.updatedAt}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoHome;
