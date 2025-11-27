import React, { useState } from "react";
import Navbar from "./Navbar";
import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";
import VerifyEmail from "./VerifyEmail";

export default function App() {
  const [page, setPage] = useState("home"); // home, signup, login, verify
  const [verifyEmailAddr, setVerifyEmailAddr] = useState("");

  const goTo = (p) => setPage(p);
  const onSignupSuccess = (email) => {
    setVerifyEmailAddr(email);
    setPage("verify");
  };
  const onVerifySuccess = () => setPage("login");
  const onLoginSuccess = (data) => {
    alert("Login successful!");
    setPage("home");
  };

  return (
    <div className="app">
      <Navbar current={page} onNav={goTo} />
      <main>
        {page === "home" && <Home />}
        {page === "signup" && <Signup onSignupSuccess={onSignupSuccess} />}
        {page === "login" && (
          <Login
            onLoginSuccess={onLoginSuccess}
            onGoToSignup={() => setPage("signup")}
          />
        )}
        {page === "verify" && (
          <VerifyEmail
            email={verifyEmailAddr}
            onVerifySuccess={onVerifySuccess}
            onBackToSignup={() => setPage("signup")}
          />
        )}
      </main>
    </div>
  );
}
