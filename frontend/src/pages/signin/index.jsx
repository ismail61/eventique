import React, { useState } from 'react';
import './index.css'; 
import { toast } from 'react-toastify';

const SignIn = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/user-auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      if (responseData?.data) {
        toast.success('Logged in successfully')
        localStorage.setItem('user', responseData?.data);

        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      } else {
        toast.error(responseData?.message || 'Failed to Signup');
      }

    } catch (error) {
      console.error('Error during sign-in:', error.message);
    }
  };

  return (
    <div>
      <div className="hero" style={{ height: '100vh' }}>
        <div className="hero-content">
          <h1>Sign In</h1>
          <form className="signin-form" onSubmit={handleSignIn}>
            {/* Form fields with controlled components */}
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={formData.email} onChange={handleChange} required />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={formData.password} onChange={handleChange} required />

            <br />
            <br />

            <button type="submit">Sign In</button>

            <div className="forgot-password">
              <a href="/forgot-password">
                Forgot Password?
              </a>
            </div>
            <div className="signup" >
              <a href="/vendor/signin" style={{ color: 'black' }}>
                Vendor SignIn
              </a>
            </div>
            <div className="signup" >
              <a href="/signup" style={{ color: 'black' }}>
                Signup
              </a>
            </div>
          </form>
        </div>
      </div>

      <footer>
        <p>© 2023 Eventique. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default SignIn;
