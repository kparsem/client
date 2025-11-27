import React, { useState } from "react";

function prettyJson(obj) {
  try {
    return JSON.stringify(obj, null, 2);
  } catch (e) {
    return String(obj);
  }
}

export default function ErrorPanel({ parsedError }) {
  const [open, setOpen] = useState(true);

  if (!parsedError) return null;

  const details = {
    status: parsedError.status,
    statusText: parsedError.statusText,
    message: parsedError.serverMessage || parsedError.message,
    responseBody: parsedError.serverData,
    request: parsedError.request,
    responseHeaders: parsedError.responseHeaders,
  };
  let advice = "";
  if (parsedError.isNetworkError)
    advice =
      "Network error: could not reach the server — check the base URL and network connectivity.";
  else if (details.status === 401)
    advice =
      "Unauthorized: check email/password or ensure you have confirmed your email.";
  else if (details.status === 400 || details.status === 422)
    advice =
      "Validation error: verify all required fields and field formats (email, password length, role etc.).";

  // Check for passwords mismatch keywords in server message and provide a clear hint
  const serverMsgLower = String(details.message || "").toLowerCase();
  if (
    serverMsgLower.includes("confirm") ||
    (serverMsgLower.includes("password") && serverMsgLower.includes("match"))
  ) {
    advice =
      "Password confirmation does not match the password: ensure both fields match and are sent as part of the request (confirmPassword).";
  } else if (details.status === 415)
    advice =
      "Unsupported media type: server may expect a different Content-Type header; confirm whether it expects application/json or application/x-www-form-urlencoded.";
  else if (details.status >= 500)
    advice =
      "Server error: backend encountered an issue (5xx). Check server logs.";

  const copyDetails = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(details, null, 2));
      alert("Error details copied to clipboard");
    } catch (e) {
      // ignore
    }
  };

  return (
    <div className={`error-panel`} style={{ marginTop: 12 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <strong style={{ color: "#B91C1C" }}>Request Diagnostic</strong>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button className="btn btn-link" onClick={() => setOpen(!open)}>
            {open ? "Hide" : "Show"} details
          </button>
          <button className="btn btn-link" onClick={copyDetails}>
            Copy
          </button>
        </div>
      </div>

      {open && (
        <div style={{ marginTop: 10 }}>
          <div className="card" style={{ background: "#fff", padding: 12 }}>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>Summary</div>
            <pre style={{ whiteSpace: "pre-wrap", fontSize: 13 }}>
              {details.message}
            </pre>

            <div style={{ fontWeight: 700, marginTop: 12 }}>HTTP</div>
            <div style={{ fontSize: 13, color: "#374151" }}>
              Status: {details.status ?? "N/A"}{" "}
              {details.statusText ? `- ${details.statusText}` : ""}
            </div>

            <div style={{ fontWeight: 700, marginTop: 12 }}>Response Body</div>
            <pre style={{ whiteSpace: "pre-wrap", fontSize: 13 }}>
              {prettyJson(details.responseBody)}
            </pre>

            <div style={{ fontWeight: 700, marginTop: 12 }}>Request</div>
            <div style={{ fontSize: 13, color: "#374151" }}>
              Method: {details.request?.method ?? "N/A"} <br />
              URL: {details.request?.url ?? "N/A"}
            </div>
            <div style={{ fontWeight: 700, marginTop: 8 }}>Request Headers</div>
            <pre style={{ whiteSpace: "pre-wrap", fontSize: 13 }}>
              {prettyJson(details.request?.headers)}
            </pre>

            <div style={{ fontWeight: 700, marginTop: 8 }}>Request Body</div>
            <pre style={{ whiteSpace: "pre-wrap", fontSize: 13 }}>
              {details.request?.body ?? ""}
            </pre>
          </div>

          <div style={{ marginTop: 8 }}>
            <div style={{ fontSize: 13, color: "#6b7280" }}>
              {advice ||
                "Tip: Check required fields, content-type header, and server logs for more info."}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
