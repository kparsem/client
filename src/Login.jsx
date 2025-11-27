import React, { useState } from "react";
import { login } from "./api";
import { attachToken } from "./api";
import ErrorPanel from "./ErrorPanel";

export default function Login({ onLoginSuccess, onGoToSignup }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Email and password are required");
      return;
    }

    setLoading(true);
    setApiError(null);
    try {
      const res = await login({ email: form.email, password: form.password });
      const token =
        res.data?.token ||
        res.data?.accessToken ||
        res.data?.jwt ||
        res.data?.authToken;
      if (token) {
        attachToken(token);
        try {
          localStorage.setItem("banking_token", token);
        } catch (e) {}
      }
      onLoginSuccess(res.data);
    } catch (err) {
      setApiError(err.parsed || { message: err.message });
      setError(err.parsed?.serverMessage || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page auth-page">
      <div className="card auth-card">
        <h2>Login</h2>
        <p className="lead">Welcome back — enter your details to continue.</p>
        <div className="card" style={{ marginTop: 12, padding: 10 }}>
          <div style={{ fontWeight: 700 }}>Backend expects</div>
          <div style={{ fontSize: 13, color: "#6b7280" }}>
            POST {"/banking/auth/login"} — fields: <strong>email</strong>,{" "}
            <strong>password</strong>. Default Content-Type:{" "}
            <code>application/x-www-form-urlencoded</code>.
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}
        {apiError && <ErrorPanel parsedError={apiError} />}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              type="password"
            />
          </div>

          <div className="form-row">
            <button
              className="btn btn-link"
              type="button"
              onClick={onGoToSignup}
            >
              Create account
            </button>
            <button className="btn btn-primary btn-block" type="submit">
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
