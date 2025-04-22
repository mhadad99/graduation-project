/*depend.. 1: npm install bootstrap react-social-login-buttons*/
/* 2- npm install axios */
/* 3- npm install @react-oauth/google */

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoogleLoginButton, AppleLoginButton } from 'react-social-login-buttons';
import axios from 'axios'; 
// import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import '../styles/Login.css';


export default function LoginPage()  {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

   /* validation using axios */
  /* validate email format */
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const isEmailEmpty = email.trim() === '';
  const isEmailValid = !isEmailEmpty && validateEmail(email);
  const showEmptyError = (touched || submitted) && isEmailEmpty;
  const showInvalidError = (touched || submitted) && !isEmailEmpty && !isEmailValid;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTouched(true);
    setErrorMessage('');

    if (!isEmailValid) return;

    setIsLoading(true);

    try {
      /* API endpoint*/
      const response = await axios.post('https://api-url.com/login', { email });

      console.log('Login successful:', response.data);
      /* to store token */

    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage('Login failed. Please check your email or try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBlur = () => {
    setTouched(true);
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <img src="../TANFEEZ.png" alt="Tanfeez Logo" className="logo" />
      </div>

      <div className="login-card">
        <h2 className="text-center mb-4">Login to Tanfeez</h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className={`mb-3 ${(showEmptyError || showInvalidError) ? 'was-validated' : ''}`}>
            <label htmlFor="email" className="form-label fs-5">Email</label>
            <input
              type="email"
              className={`form-control form-control-lg ${(showEmptyError || showInvalidError) ? 'is-invalid' : ''}`}
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email'
              onBlur={handleBlur}
              required
            />
            {showEmptyError && (
              <div className="invalid-feedback">This field is required</div>
            )}
            {showInvalidError && (
              <div className="invalid-feedback">Please enter a valid email address</div>
            )}
          </div>

          {errorMessage && (
            <div className="alert alert-danger py-2">{errorMessage}</div>
          )}

          <button
            type="submit"
            className="btn continue-btn w-100 mb-4 py-3"
            disabled={isLoading}
          >
            {isLoading ? 'Continuing...' : 'Continue'}
          </button>
        </form>

        <div className="divider mb-4">
          <span className="divider-line"></span>
          <span className="divider-text fs-6">or</span>
          <span className="divider-line"></span>
        </div>

        <div className="social-buttons">
          <GoogleLoginButton
            onClick={() => console.log('Google login')}
            className="mb-3"
            style={{ fontSize: '16px', padding: '12px' }}
          />
          <AppleLoginButton
            onClick={() => console.log('Apple login')}
            style={{ fontSize: '16px', padding: '12px' }}
          />
        </div>

        <div className="signup-prompt text-center mt-5">
          <p className="fs-6 mb-2">Don't have an account?</p>
          <a href="/signup" className="btn btn-outline-success">Sign Up</a>
        </div>
      </div>
    </div>
  );
};

