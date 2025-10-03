// src/components/TaskList.js
import React from "react";
import TaskItem from "./ToDoItem";

function ToDoList({ tasks, onToggleComplete }) {
  if (!tasks || tasks.length === 0) {
    return <p>タスクはありません</p>;
  }

  return (
    <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </ul>
  );
}
export default ToDoList;
