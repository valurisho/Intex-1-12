// The code in this LoginPage is broken into 3 parts. The first, uncommented code is a combination of the other two.
// We made the second one, and the third one is from Dr. Well's videos.

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
  // 🔐 Login form state
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberme, setRememberme] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // ✏️ Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;
    if (type === 'checkbox') setRememberme(checked);
    else if (name === 'email') setEmail(value);
    else if (name === 'password') setPassword(value);
  };

  // 🔄 Submit form to login endpoint
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    const loginUrl = rememberme
      ? 'https://intex-group1-12-backend-bdb9gqd9ecfvhtc8.westus3-01.azurewebsites.netlogin?useCookies=true'
      : 'https://intex-group1-12-backend-bdb9gqd9ecfvhtc8.westus3-01.azurewebsites.net/login?useSessionCookies=true';

    try {
      const response = await fetch(loginUrl, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const contentLength = response.headers.get('content-length');
      const data =
        contentLength && parseInt(contentLength) > 0
          ? await response.json()
          : null;

      if (!response.ok) {
        throw new Error(data?.message || 'Invalid email or password.');
      }

      navigate('/mainPage'); // ✅ Redirect after login
    } catch (error: any) {
      setError(error.message || 'Login failed.');
      console.error('Login error:', error);
    }
  };

  // const handleRegisterClick = () => {
  //   navigate('/register');
  // };

  return (
    <motion.div
      className="login-container"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
    >
      {/* Left: Login form */}
      <div className="login-left">
        <div className="logo">
          <img src="/logo-black.png" alt="CineNiche Logo" />
        </div>
        <h2>Login to Your Account</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
            className="form-input"
          />

          <div className="input-with-icon">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
              className="form-input"
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          <button type="submit" className="sign-in-btn">
            Sign In
          </button>
          {error && <p className="error-msg">{error}</p>}
        </form>
      </div>

      {/* Right: Sign up */}
      <div className="login-right">
        <h2>New to CineNiche?</h2>
        <p>Explore rare films and hidden gems you won’t find anywhere else.</p>
        <Link to="/register">
          <button className="sign-up-btn">Sign Up</button>
        </Link>
      </div>
    </motion.div>
  );
};

export default LoginPage;
