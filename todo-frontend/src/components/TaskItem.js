import React, { useState } from "react";

function TaskItem({ task, onDelete, onUpdate, onToggleComplete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDetails, setEditDetails] = useState(task.details);
  const [error, setError] = useState("");

  const handleSave = () => {
    if (editTitle.length > 25) {
      setError("タイトルは25文字以内で入力してください");
      return;
    }
    if (!editTitle || !editDetails) {
      setError("タイトルと詳細を入力してください");
      return;
    }
    setError("");
    onUpdate(task.id, editTitle, editDetails);
    setIsEditing(false);
  };

  return (
    <li className="todo-item">
      {!isEditing ? (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleComplete(task.id)}
              aria-label="完了切り替え"
              style={{ transform: "scale(0.9)", accentColor: "#a78bfa" }}
            />
            <h3
              style={{
                margin: 0,
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.title}
            </h3>
          </div>

          <p style={{ marginTop: "6px", whiteSpace: "pre-wrap" }}>
            {task.details}
          </p>

          <div style={{ color: "#666", fontSize: "12px", marginTop: "6px" }}>
            <div>作成日時: {task.createdAt}</div>
            <div>更新日時: {task.updatedAt}</div>
          </div>

          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button
              className="btn btn-ghost"
              onClick={() => setIsEditing(true)}
            >
              ✏️ 編集
            </button>
            <button
              className="btn btn-logout"
              onClick={() => onDelete(task.id)}
            >
              🗑 削除
            </button>
          </div>
        </>
      ) : (
        <>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="タイトル（25文字以内）"
          />
          <textarea
            value={editDetails}
            onChange={(e) => setEditDetails(e.target.value)}
            placeholder="詳細"
          />
          {error && (
            <p style={{ color: "red", fontSize: "13px", marginTop: "6px" }}>
              {error}
            </p>
          )}

          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button className="btn btn-primary" onClick={handleSave}>
              💾 保存
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => {
                setIsEditing(false);
                setEditTitle(task.title);
                setEditDetails(task.details);
                setError("");
              }}
            >
              ✖ キャンセル
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export default TaskItem;
