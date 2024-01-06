import React, { useState } from 'react';
import "./Login.css";
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { toast, ToastContainer } from 'react-toastify';

const Login = () => {
  // State hooks for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  // Helper function to validate email
  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email.toLowerCase());
  };

  // Event handlers
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailValid(validateEmail(e.target.value));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordValid(e.target.value.length > 0);
  };
  const navigate = useNavigate(); // Hook for navigation


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateEmail(email) && password) {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, {
          email: email,
          password: password
        });
        if (response.data.success) {
          toast.success('Login successful');
          navigate('/dashboard');
        } else {
          toast.error('Login failed: ' + response.data.message);
        }
      } catch (error) {
        toast.error('Login error: ' + (error.response?.data?.message || 'An error occurred during login'));
      }
    } else {
      setEmailValid(validateEmail(email));
      setPasswordValid(password.length > 0);
      toast.error('Please enter valid email and password');
    }
  };
  return (
    <div className="login-form">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className={`form-group ${!emailValid ? 'is-invalid' : ''}`}>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
            className="form-control"
          />
          {!emailValid && <div className="invalid-feedback">Please enter a valid email</div>}
        </div>
        <div className={`form-group ${!passwordValid ? 'is-invalid' : ''}`}>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
            className="form-control"
          />
          {!passwordValid && <div className="invalid-feedback">Please enter a valid password</div>}
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      <p>
        Don't have an account? <a href="/sign-up">Sign Up here</a>
      </p>
    </div>
  );
};

export default Login;
