import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';
import { motion } from 'framer-motion';
import { API_URL } from '../api/MovieAPI';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  function validatePassword(password: string): string[] {
    const errors = [];
    if (password.length < 12) errors.push('At least 12 characters');
    if (!/[A-Z]/.test(password)) errors.push('At least one uppercase letter');
    if (!/[a-z]/.test(password)) errors.push('At least one lowercase letter');
    if (!/[0-9]/.test(password)) errors.push('At least one number');
    if (!/[^A-Za-z0-9]/.test(password))
      errors.push('At least one special character');
    if (new Set(password).size < 4) errors.push('At least 4 unique characters');
    if (confirmPassword && password !== confirmPassword)
      passwordErrors.push('Passwords do not match');
    return errors;
  }

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') {
      setPassword(value);
      setPasswordErrors(validatePassword(value)); // validate as they type
    }
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
      fetch(`${API_URL}/register`, {
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
        <h2>Experience Cinema Differently</h2>
        <p>
          Create your account to explore curated content beyond the mainstream
        </p>
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

          {password.length > 0 && passwordErrors.length > 0 && (
            <div className="password-rules">
              {passwordErrors.map((err, idx) => (
                <div key={idx} className="password-rule">
                  {err}
                </div>
              ))}
            </div>
          )}

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleChange}
          />

          {confirmPassword && password && confirmPassword !== password && (
            <div className="password-rules">
              <p className="password-rule">Passwords do not match</p>
            </div>
          )}

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
