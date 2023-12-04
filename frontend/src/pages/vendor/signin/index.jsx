// SignIn.js
import React, { useState } from 'react';
import './index.css'; // Import your CSS file
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const VendorSignIn = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/vendor-auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      if (responseData?.data) {
        toast.success('Successfully Logged in');
        localStorage.setItem('vendor', responseData?.data);
        setTimeout(() => {
          window.location.href = '/vendor/items';
        }, 3000);
      } else {
        toast.error(responseData?.message || 'Failed to Signup');
      }

    } catch (error) {
      console.error('Error during sign-in:', error.message);;
      toast.error('Failed to Sign in');
    }
  };

  return (
    <div>
      <nav>
        <div className="">
          <img src="../images/logo.png" height={"100px"} width={"100px"} alt="Eventique Logo" />
        </div>
        <div className="tabs">
          <ul>
            <li>
              <a href="/about">
                <button className="tab">About Us</button>
              </a>
            </li>
            <li>
              <a href="/faq">
                <button className="tab">FAQ</button>
              </a>
            </li>
            <li>
              <a href="/vendor/signup">
                <button className="tab">Sign up</button>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div className="hero" style={{ height: '100vh' }}>
        <div className="hero-content">
          <h1>Vendor Sign In</h1>
          <form className="signin-form" onSubmit={handleSignIn}>
            {/* Form fields with controlled components */}
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={formData.email} onChange={handleChange} required />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={formData.password} onChange={handleChange} required />

            <br />
            <br />
            <button type="submit">Sign In</button>
          </form>
        </div>
      </div>

      <footer>
        <p>© 2023 Eventique. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default VendorSignIn;
