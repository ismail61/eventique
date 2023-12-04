import React, { useState } from 'react';
 import './index.css';
import { toast } from 'react-toastify';
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const user = localStorage.getItem('user');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Email validation
    if (email.trim() === '') {
      alert('Please enter your email address.');
      return;
    }
    try {
      const response = await fetch('http://localhost:3001/user-auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': user,
        },
        body: JSON.stringify({
          email
        }),
      });

      const responseData = await response.json();
      if (responseData?.data) {
        toast.success('Check your email address');
        window.location.href = '/';
      } else {
        toast.error(responseData?.message || 'Failed to forgot password');
      }
    } catch (error) {
      console.log(error);
      toast.error('Invalid Request');
    }
  };


  return (
    <div>
      <div className="hero" style={{ height: '100vh' }}>
        <div className="hero-content">
          <h1>Forgot Password</h1>
          <p>Please enter your email address below to reset your password.</p>

          <form onSubmit={handleSubmit} id="forgot-password-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Reset Password</button>
          </form>
        </div>
      </div>

      <footer>
        <p>&copy; 2023 Eventique. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ForgotPassword;
