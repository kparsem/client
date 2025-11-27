import React, { useState } from "react";
import { signup } from "./api";
import ErrorPanel from "./ErrorPanel";

export default function Signup({ onSignupSuccess }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
    role: "",
  });
  const [error, setError] = useState("");
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const validate = () => {
    if (!form.firstName.trim()) return "First name is required";
    if (!form.lastName.trim()) return "Last name is required";
    if (!form.email.trim() || !form.email.includes("@"))
      return "Valid email is required";
    if (form.password.length < 6)
      return "Password must be at least 6 characters";
    if (form.password !== form.confirmPassword) return "Passwords do not match";
    if (!form.company.trim()) return "Company is required";
    if (!form.role) return "Please select a role";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setError(err);
      return;
    }

    setLoading(true);
    setApiError(null);
    try {
      await signup({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        confirmPassword: form.confirmPassword,
        company: form.company,
        role: form.role,
      });
      // on success redirect to verify, passing email
      onSignupSuccess(form.email);
    } catch (error) {
      // axios errors are normalized and thrown with a `.parsed` object in api.js
      setApiError(error.parsed || { message: error.message });
      setError(error.parsed?.serverMessage || error.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page auth-page">
      <div className="card auth-card">
        <h2>Create Account</h2>
        <p className="lead">Open an account in minutes with secure signup.</p>
        <div className="card" style={{ marginTop: 12, padding: 10 }}>
          <div style={{ fontWeight: 700 }}>Backend expects</div>
          <div style={{ fontSize: 13, color: "#6b7280" }}>
            POST {"/banking/auth/signup"} — fields: <strong>firstName</strong>,{" "}
            <strong>lastName</strong>, <strong>email</strong>,{" "}
            <strong>password</strong>, <strong>confirmPassword</strong>,{" "}
            <strong>company</strong>, <strong>role</strong>. Default
            Content-Type: <code>application/x-www-form-urlencoded</code>.
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}
        {apiError && <ErrorPanel parsedError={apiError} />}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Password</label>
              <input
                name="password"
                value={form.password}
                onChange={handleChange}
                type="password"
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                type="password"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Company</label>
            <input
              name="company"
              value={form.company}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Role</label>
            <select name="role" value={form.role} onChange={handleChange}>
              <option value="">Select role</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="staff">Staff</option>
              <option value="customer">Customer</option>
            </select>
          </div>

          <button
            className="btn btn-primary btn-block"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
