import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch, FiTag, FiFileText, FiShield } from "react-icons/fi";
import "./Login.css";

function base64URLEncode(str) {
  return btoa(String.fromCharCode(...new Uint8Array(str)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function sha256(buffer) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(buffer));
  return base64URLEncode(digest);
}

export const Login = () => {
  const handleGoogleSignIn = async () => {
    window.location.href = "http://localhost:8000/auth/login";
  };


  return (
    <div className="auth-page">
      <div className="auth-info">
        <div className="auth-info-content">
          <h1 className="auth-app-title">VaultIQ</h1>
          <h2 className="auth-app-subtitle">AI-Powered File Management System</h2>
          <div className="auth-features">
            <div className="auth-feature">
              <span className="auth-feature-icon">
                <FiSearch />
              </span>
              <div>
                <h3>Breadcrumb Navigation</h3>
                <p>Improved user experience and intuitive file browsing.</p>
              </div>
            </div>
            <div className="auth-feature">
              <span className="auth-feature-icon">
                <FiTag />
              </span>
              <div>
                <h3>Auto-Tagging</h3>
                <p>Automatic file organization with intelligent tagging</p>
              </div>
            </div>
            <div className="auth-feature">
              <span className="auth-feature-icon">
                <FiFileText />
              </span>
              <div>
                <h3>Document Summaries</h3>
                <p>AI-generated summaries for quick file previews</p>
              </div>
            </div>
            <div className="auth-feature">
              <span className="auth-feature-icon">
                <FiShield />
              </span>
              <div>
                <h3>Secure Storage</h3>
                <p>AES encryption with cloud-based storage on AWS S3</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="auth-form-container">
        <form onSubmit={e => e.preventDefault()} className="login-form">
          <h2 className="login-title">Log In/Sign Up</h2>
          <p className="login-subtitle">Sign in to access your files</p>
          <button type="button" className="login-buttongoogle-login-button" onClick={handleGoogleSignIn}>
            <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" style={{ width: 24, height: 24, display: 'inline-block', verticalAlign: 'middle', marginBottom: '-2px', marginRight: '0.2rem'}} />
            Sign in with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login; 