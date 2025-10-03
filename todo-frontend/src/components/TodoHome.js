// src/components/TodoHome.js
import React, { useState, useMemo } from "react";
import ToDoList from "./ToDoList";

function ToDoHome({ onLogout, username }) {
  // タスク一覧
  const [tasks, setTasks] = useState([]);

  // フォーム入力
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  // エラー & 通知
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");

  // フィルタ ('all' | 'completed' | 'incomplete')
  const [filter, setFilter] = useState("all");

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
    const now = new Date().toLocaleString();

    // 新しいタスク
    const newTask = {
      id: Date.now(), // 一意のID
      title: t,
      details: d,
      createdAt: now,
      updatedAt: now,
      completed: false, // 初期は未完了
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

  // 完了/未完了トグル
  const handleToggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              updatedAt: new Date().toLocaleString(),
            }
          : task
      )
    );
  };

  // ログアウト
  const handleLogout = () => {
    setTasks([]); // 表示用をクリア（任意）
    onLogout(); // 親から渡されたログアウト処理を実行
  };

  // フィルタ適用後の配列
  const filteredTasks = useMemo(() => {
    if (filter === "completed") return tasks.filter((t) => t.completed);
    if (filter === "incomplete") return tasks.filter((t) => !t.completed);
    return tasks;
  }, [tasks, filter]);

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
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    marginTop: "10px",
  };

  const filterBarStyle = { display: "flex", gap: "10px", marginTop: "20px" };
  const filterBtn = (type) => ({
    padding: "10px 20px",
    border: "none",
    cursor: "pointer",
    color: "#fff",
    backgroundColor: filter === type ? "#007bff" : "#6c757d",
  });

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
      <form onSubmit={handleAddTask} style={{ marginBottom: "10px" }}>
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
        <p style={{ color: "green", marginBottom: "10px" }}>{notification}</p>
      )}

      {/* フィルタリングボタン */}
      <div style={filterBarStyle}>
        <button
          style={filterBtn("all")}
          onClick={() => setFilter("all")}
          type="button"
        >
          すべて
        </button>
        <button
          style={filterBtn("completed")}
          onClick={() => setFilter("completed")}
          type="button"
        >
          完了
        </button>
        <button
          style={filterBtn("incomplete")}
          onClick={() => setFilter("incomplete")}
          type="button"
        >
          未完了
        </button>
      </div>

      {/* タスクリスト */}
      <ToDoList tasks={filteredTasks} onToggleComplete={handleToggleComplete} />
    </div>
  );
}

export default ToDoHome;
