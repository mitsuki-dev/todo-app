// src/components/FilterBar.js
import React from "react";

export const FILTERS = {
  ALL: "all",
  DONE: "done",
  TODO: "todo",
};

export default function FilterBar({ current, onChange }) {
  const opts = [
    { key: FILTERS.ALL, label: "すべて" },
    { key: FILTERS.DONE, label: "完了" },
    { key: FILTERS.TODO, label: "未完了" },
  ];

  return (
    <div className="filter__wrap">
      {opts.map((o) => (
        <button
          key={o.key}
          className={`filter__btn ${current === o.key ? "is-active" : ""}`}
          onClick={() => onChange(o.key)}
          type="button"
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
