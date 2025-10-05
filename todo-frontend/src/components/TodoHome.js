// src/components/TodoHome.js
import React, { useState } from "react";
import TaskFilter from "./TaskFilter";
import TaskList from "./TaskList";

// Todoアプリのメインコンポーネント
function TodoHome({ onLogout, username }) {
  // タスク全体の状態管理
  const [tasks, setTasks] = useState([]);

  // フォーム入力の状態管理
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  // フィルタリング状態の管理: 'all' | 'completed' | 'incomplete'
  const [filter, setFilter] = useState("all");

  // エラー表示
  const [error, setError] = useState("");

  // タスク追加
  const handleAddTask = (e) => {
    e.preventDefault();

    // バリデーション
    if (title.length > 25) {
      setError("タイトルは25文字以内で入力してください");
      return;
    }
    if (!title || !details) {
      setError("タイトルと詳細を入力してください");
      return;
    }
    setError("");

    const currentDateTime = new Date().toLocaleString();
    const newTask = {
      id: Date.now(), // 一意なID
      title,
      details,
      createdAt: currentDateTime, // 作成日時
      updatedAt: currentDateTime, // 更新日時
      completed: false, // 初期は未完了
    };

    setTasks([...tasks, newTask]);
    setTitle("");
    setDetails("");
  };

  // タスク削除
  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  // タスク編集・更新
  const handleUpdateTask = (taskId, updatedTitle, updatedDetails) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              title: updatedTitle,
              details: updatedDetails,
              updatedAt: new Date().toLocaleString(), // 更新日時を更新
            }
          : task
      )
    );
  };

  // 完了/未完了トグル
  const handleToggleComplete = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              completed: !task.completed,
              updatedAt: new Date().toLocaleString(),
            }
          : task
      )
    );
  };

  // 現在のフィルタに応じてタスクを抽出
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true; // all
  });

  // ====== スタイル（簡易） ======
  const containerStyle = { width: "600px", margin: "0 auto", padding: "20px" };
  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  };
  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginTop: "20px",
  };
  const inputStyle = {
    padding: "10px",
    fontSize: "16px",
    width: "100%",
    boxSizing: "border-box",
  };
  const errorStyle = { color: "red", fontSize: "14px" };
  const logoutButtonStyle = {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  };
  const addButtonStyle = {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      {/* ヘッダー */}
      <header style={headerStyle}>
        <div>{username}でログイン中</div>
        <button style={logoutButtonStyle} onClick={onLogout}>
          ログアウト
        </button>
      </header>

      {/* タスク追加フォーム */}
      <form style={formStyle} onSubmit={handleAddTask}>
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
          style={{ ...inputStyle, height: "120px" }}
        />
        {error && <p style={errorStyle}>{error}</p>}
        <button type="submit" style={addButtonStyle}>
          追加
        </button>
      </form>

      {/* フィルタボタン */}
      <TaskFilter filter={filter} setFilter={setFilter} />

      {/* タスクリスト */}
      <TaskList
        tasks={filteredTasks}
        onDelete={handleDeleteTask}
        onUpdate={handleUpdateTask}
        onToggleComplete={handleToggleComplete}
      />
    </div>
  );
}

export default TodoHome;
