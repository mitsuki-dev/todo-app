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

  const liStyle = {
    border: "1px solid #ddd",
    borderRadius: "6px",
    padding: "12px",
    marginBottom: "12px",
    background: "#fff",
  };

  const metaStyle = { color: "#666", fontSize: "12px", marginTop: "6px" };
  const rowStyle = {
    display: "flex",
    gap: "8px",
    marginTop: "10px",
    flexWrap: "wrap",
  };
  const btn = {
    padding: "8px 12px",
    fontSize: "14px",
    border: "none",
    cursor: "pointer",
    borderRadius: "4px",
  };

  return (
    <li style={liStyle}>
      {/* 表示 or 編集フォーム */}
      {!isEditing ? (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleComplete(task.id)}
              aria-label="完了切り替え"
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
          <div style={metaStyle}>
            <div>作成日時: {task.createdAt}</div>
            <div>更新日時: {task.updatedAt}</div>
          </div>

          <div style={rowStyle}>
            <button
              style={{ ...btn, background: "#0d6efd", color: "#fff" }}
              onClick={() => setIsEditing(true)}
            >
              編集
            </button>
            <button
              style={{ ...btn, background: "#dc3545", color: "#fff" }}
              onClick={() => onDelete(task.id)}
            >
              削除
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
            style={{
              width: "100%",
              padding: "8px",
              fontSize: "14px",
              boxSizing: "border-box",
            }}
          />
          <textarea
            value={editDetails}
            onChange={(e) => setEditDetails(e.target.value)}
            placeholder="詳細"
            style={{
              width: "100%",
              height: "100px",
              padding: "8px",
              fontSize: "14px",
              boxSizing: "border-box",
              marginTop: "8px",
            }}
          />
          {error && (
            <p style={{ color: "red", fontSize: "13px", marginTop: "6px" }}>
              {error}
            </p>
          )}

          <div style={rowStyle}>
            <button
              style={{ ...btn, background: "#198754", color: "#fff" }}
              onClick={handleSave}
            >
              保存
            </button>
            <button
              style={{ ...btn, background: "#6c757d", color: "#fff" }}
              onClick={() => {
                setIsEditing(false);
                setEditTitle(task.title);
                setEditDetails(task.details);
                setError("");
              }}
            >
              キャンセル
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export default TaskItem;
