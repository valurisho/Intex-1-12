import React from 'react';
import './LoginPage.css';

const LoginPage = () => {
  return (
    <div className="login-container">
      {/* Left: Login form */}
      <div className="login-left">
        <div className="logo">🎬 CineNiche</div>
        <h2>Login to Your Account</h2>
        <p className="subtext">Login using social networks</p>
        <div className="social-buttons">
          <button className="social-btn facebook">f</button>
          <button className="social-btn google">G+</button>
          <button className="social-btn linkedin">in</button>
        </div>

        <div className="divider">OR</div>

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
        <h2>New Here?</h2>
        <p>Sign up and discover a great amount of new opportunities!</p>
        <button className="sign-up-btn">Sign Up</button>
      </div>
    </div>
  );
};

export default LoginPage;
