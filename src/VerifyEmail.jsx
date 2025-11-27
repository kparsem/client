import React, { useState } from "react";
import { verifyEmail } from "./api";
import ErrorPanel from "./ErrorPanel";

export default function VerifyEmail({
  email,
  onVerifySuccess,
  onBackToSignup,
}) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setCode(value);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code || code.length < 6) {
      setError("Please enter the 6-digit code");
      return;
    }

    setLoading(true);
    setApiError(null);
    try {
      await verifyEmail({ email, code });
      onVerifySuccess();
    } catch (err) {
      setApiError(err.parsed || { message: err.message });
      setError(
        err.parsed?.serverMessage || err.message || "Verification failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page auth-page">
      <div className="card auth-card">
        <h2>Verify Email</h2>
        <p className="lead">Enter the 6-digit code sent to {email}</p>
        <div className="card" style={{ marginTop: 12, padding: 10 }}>
          <div style={{ fontWeight: 700 }}>Backend expects</div>
          <div style={{ fontSize: 13, color: "#6b7280" }}>
            POST {"/banking/auth/verifyemail"} — fields: <strong>email</strong>,{" "}
            <strong>code</strong>. Default Content-Type:{" "}
            <code>application/x-www-form-urlencoded</code>.
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}
        {apiError && <ErrorPanel parsedError={apiError} />}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input value={email} readOnly />
          </div>

          <div className="form-group">
            <label>Verification Code</label>
            <input value={code} onChange={handleChange} placeholder="000000" />
          </div>

          <div className="form-row">
            <button
              type="button"
              className="btn btn-link"
              onClick={onBackToSignup}
            >
              ← Back
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading || code.length < 6}
            >
              {loading ? "Verifying..." : "Verify"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
