import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';
import { motion } from 'framer-motion';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'confirmPassword') setConfirmPassword(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
    } else if (password !== confirmPassword) {
      setError('Passwords do not match.');
    } else {
      setError('');
      fetch('https://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
        .then((res) => {
          if (res.ok) {
            navigate('/login');
          } else {
            setError('Error registering.');
          }
        })
        .catch(() => setError('Error registering.'));
    }
  };

  return (
    <motion.div
      className="register-container"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
    >
      {/* Left side: Welcome back */}
      <div className="register-left">
        <img
          src="/logo-letters.png"
          alt="CineNiche Logo"
          className="register-logo"
        />
        <h2>Welcome Back!</h2>
        <p>To keep connected with us please login with your personal info</p>
        <button className="sign-in2-btn" onClick={handleLoginClick}>
          SIGN IN
        </button>
      </div>

      {/* Right side: Create account form */}
      <div className="register-right">
        <h2>Create Account</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleChange}
          />
          <button type="submit" className="register-submit-btn">
            SIGN UP
          </button>
          {error && <p className="register-error">{error}</p>}
        </form>
      </div>
    </motion.div>
  );
};

export default RegisterPage;
