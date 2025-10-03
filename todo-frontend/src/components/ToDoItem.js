// src/components/ToDoItem.js （or TaskItem.js）
import React from "react";

export default function ToDoItem({ task, onToggleComplete }) {
  const textStyle = {
    whiteSpace: "pre-wrap",
    textDecoration: task.completed ? "line-through" : "none",
    color: task.completed ? "#28a745" : "#000",
  };

  return (
    <li
      onClick={() => onToggleComplete(task.id)}
      style={{
        padding: "15px",
        borderBottom: "1px solid #ddd",
        cursor: "pointer",
      }}
    >
      <h3 style={textStyle}>{task.title}</h3>
      <p style={textStyle}>{task.details}</p>
      <small>作成日時: {task.createdAt}</small>
      <br />
      <small>更新日時: {task.updatedAt}</small>
    </li>
  );
}
