import React from "react";

export default function Navbar({ current, onNav }) {
  return (
    <nav className="nav">
      <div className="nav-brand">
        Bank<span className="nav-dot">App</span>
      </div>
      <ul className="nav-links">
        <li
          className={current === "home" ? "active" : ""}
          onClick={() => onNav("home")}
        >
          Home
        </li>
        <li
          className={current === "signup" ? "active" : ""}
          onClick={() => onNav("signup")}
        >
          Sign Up
        </li>
        <li
          className={current === "login" ? "active" : ""}
          onClick={() => onNav("login")}
        >
          Login
        </li>
      </ul>
    </nav>
  );
}
