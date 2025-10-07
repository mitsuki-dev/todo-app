// src/components/Header.js
import React from "react";

function Header() {
  const headerStyle = {
    textAlign: "center",
    margin: "40px 0 20px",
  };

  const titleStyle = {
    fontFamily: "'Poppins', 'Hiragino Maru Gothic ProN', sans-serif",
    fontWeight: "600",
    fontSize: "2.8rem",
    background: "linear-gradient(90deg, #a3c9f9, #d7b6f9)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    letterSpacing: "1px",
  };

  return (
    <header style={headerStyle}>
      <h1 style={titleStyle}>YOLO </h1>
      <p className="subtitle">You Only Live Once — Make it count 💫</p>
    </header>
  );
}

export default Header;
