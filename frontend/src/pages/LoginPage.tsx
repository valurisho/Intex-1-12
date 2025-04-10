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
      ? 'https://localhost:5000/login?useCookies=true'
      : 'https://localhost:5000/login?useSessionCookies=true';

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

  const handleRegisterClick = () => {
    navigate('/register');
  };

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

// import React from 'react';
// import './LoginPage.css';

// const LoginPage = () => {
//   return (
//     <div className="login-container">
//       {/* Left: Login form */}
//       <div className="login-left">
//         <div className="logo">🎬 CineNiche</div>
//         <h2>Login to Your Account</h2>
//         <p className="subtext">Login using social networks</p>
//         <div className="social-buttons">
//           <button className="social-btn facebook">f</button>
//           <button className="social-btn google">G+</button>
//           <button className="social-btn linkedin">in</button>
//         </div>

//         <div className="divider">OR</div>

//         <form className="login-form">
//           <input type="email" placeholder="Email" />
//           <div className="password-wrapper">
//             <input type="password" placeholder="Password" />
//             <span className="eye">👁️</span>
//           </div>
//           <button type="submit" className="sign-in-btn">
//             Sign In
//           </button>
//         </form>
//       </div>

//       {/* Right: Sign up */}
//       <div className="login-right">
//         <h2>New Here?</h2>
//         <p>Sign up and discover a great amount of new opportunities!</p>
//         <button className="sign-up-btn">Sign Up</button>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Identity.css';
// import '@fortawesome/fontawesome-free/css/all.css';

// function LoginPage() {
//   // state variables for email and passwords
//   const [email, setEmail] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const [rememberme, setRememberme] = useState<boolean>(false);

//   // state variable for error messages
//   const [error, setError] = useState<string>('');
//   const navigate = useNavigate();

//   // handle change events for input fields
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, type, checked, value } = e.target;
//     if (type === 'checkbox') {
//       setRememberme(checked);
//     } else if (name === 'email') {
//       setEmail(value);
//     } else if (name === 'password') {
//       setPassword(value);
//     }
//   };

//   const handleRegisterClick = () => {
//     navigate('/register');
//   };

//   // handle submit event for the form
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError(''); // Clear any previous errors

//     if (!email || !password) {
//       setError('Please fill in all fields.');
//       return;
//     }

//     const loginUrl = rememberme
//       ? 'https://localhost:5000/login?useCookies=true'
//       : 'https://localhost:5000/login?useSessionCookies=true';

//     try {
//       const response = await fetch(loginUrl, {
//         method: 'POST',
//         credentials: 'include', // ✅ Ensures cookies are sent & received
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       // Ensure we only parse JSON if there is content
//       let data = null;
//       const contentLength = response.headers.get('content-length');
//       if (contentLength && parseInt(contentLength, 10) > 0) {
//         data = await response.json();
//       }

//       if (!response.ok) {
//         throw new Error(data?.message || 'Invalid email or password.');
//       }

//       navigate('/competition');
//     } catch (error: any) {
//       setError(error.message || 'Error logging in.');
//       console.error('Fetch attempt failed:', error);
//     }
//   };

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="card border-0 shadow rounded-3 ">
//           <div className="card-body p-4 p-sm-5">
//             <h5 className="card-title text-center mb-5 fw-light fs-5">
//               Sign In
//             </h5>
//             <form onSubmit={handleSubmit}>
//               <div className="form-floating mb-3">
//                 <input
//                   className="form-control"
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={email}
//                   onChange={handleChange}
//                 />
//                 <label htmlFor="email">Email address</label>
//               </div>
//               <div className="form-floating mb-3">
//                 <input
//                   className="form-control"
//                   type="password"
//                   id="password"
//                   name="password"
//                   value={password}
//                   onChange={handleChange}
//                 />
//                 <label htmlFor="password">Password</label>
//               </div>

//               <div className="form-check mb-3">
//                 <input
//                   className="form-check-input"
//                   type="checkbox"
//                   value=""
//                   id="rememberme"
//                   name="rememberme"
//                   checked={rememberme}
//                   onChange={handleChange}
//                 />
//                 <label className="form-check-label" htmlFor="rememberme">
//                   Remember password
//                 </label>
//               </div>
//               <div className="d-grid mb-2">
//                 <button
//                   className="btn btn-primary btn-login text-uppercase fw-bold"
//                   type="submit"
//                 >
//                   Sign in
//                 </button>
//               </div>
//               <div className="d-grid mb-2">
//                 <button
//                   className="btn btn-primary btn-login text-uppercase fw-bold"
//                   onClick={handleRegisterClick}
//                 >
//                   Register
//                 </button>
//               </div>
//               <hr className="my-4" />
//               <div className="d-grid mb-2">
//                 <button
//                   className="btn btn-google btn-login text-uppercase fw-bold"
//                   type="button"
//                 >
//                   <i className="fa-brands fa-google me-2"></i> Sign in with
//                   Google
//                 </button>
//               </div>
//               <div className="d-grid mb-2">
//                 <button
//                   className="btn btn-facebook btn-login text-uppercase fw-bold"
//                   type="button"
//                 >
//                   <i className="fa-brands fa-facebook-f me-2"></i> Sign in with
//                   Facebook
//                 </button>
//               </div>
//             </form>
//             {error && <p className="error">{error}</p>}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LoginPage;
