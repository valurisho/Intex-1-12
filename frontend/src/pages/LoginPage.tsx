import React from 'react';
import './LoginPage.css';

const LoginPage = () => {
  return (
    <div className="login-container">
      {/* Left: Login form */}
      <div className="login-left">
        <div className="logo">
          <img src="/logo-black.png" alt="CineNiche Logo" />
        </div>
        <h2>Login to Your Account</h2>

        <form className="login-form">
          <input type="email" placeholder="Email" />
          <div className="password-wrapper">
            <input type="password" placeholder="Password" />
            <span className="eye">👁️</span>
          </div>
          <button type="submit" className="sign-in-btn">
            Sign In
          </button>
        </form>
      </div>

      {/* Right: Sign up */}
      <div className="login-right">
        <h2>New to CineNiche?</h2>
        <p>Explore rare films and hidden gems you won’t find anywhere else.</p>
        <button className="sign-up-btn">Sign Up</button>
      </div>
    </div>
  );
};

export default LoginPage;
