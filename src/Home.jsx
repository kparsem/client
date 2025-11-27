import React from "react";

export default function Home() {
  return (
    <div className="page">
      <section className="hero">
        <div className="hero-left">
          <h1>Welcome to the Bank App</h1>
          <p className="lead">
            Modern, secure, and designed for the future of banking.
          </p>

          <div className="features">
            <div className="feature">
              <h3>Safe & Secure</h3>
              <p>
                We use industry-standard security to protect your data and
                transactions.
              </p>
            </div>
            <div className="feature">
              <h3>Easy to Use</h3>
              <p>
                A clean design and friendly UX to help you manage accounts
                quickly.
              </p>
            </div>
            <div className="feature">
              <h3>Built for Teams</h3>
              <p>
                Invite team members, assign roles, and maintain workflows with
                ease.
              </p>
            </div>
          </div>
        </div>
        <div className="hero-right">
          <div className="card">
            <h3>Get started</h3>
            <p>
              Create an account to access banking features or login to continue.
            </p>
          </div>
        </div>
      </section>

      <section className="info">
        <h2>Why choose our bank</h2>
        <p>
          We combine the reliability of classic banking with modern APIs and
          tools for developers and teams.
        </p>
        <div className="info-grid">
          <div className="grid-item">
            <h4>API First</h4>
            <p>Integrate with your apps using standard JSON endpoints.</p>
          </div>
          <div className="grid-item">
            <h4>Role Based Access</h4>
            <p>Manage user roles and permissions with a simple interface.</p>
          </div>
          <div className="grid-item">
            <h4>Fast Payments</h4>
            <p>Low-latency, secure payments with audit logging.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
