import React, { useState } from 'react';
import './index.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });


  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/user-auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      if (responseData?.data) {
        toast.success('Successful');
        setTimeout(() => {
          navigate('/signin');
        }, 2000);
      } else {
        toast.error(responseData?.message || 'Failed to Signup');
      }
    } catch (error) {
      console.log(error);
      toast.error('Invalid Signup');
    }
  };

  return (
    <div>
      <nav>
        {/* ... Navigation code ... */}
      </nav>

      <div className="hero">
        <div className="hero-content">
          <h1>Sign Up</h1>
          <form className="signup-form" onSubmit={handleSubmit}>
            {/* Form fields with controlled components */}
            <label htmlFor="name">Name</label>
            <input type="text" id="name" value={formData.name} onChange={handleChange} required />

            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={formData.email} onChange={handleChange} required />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={formData.password} onChange={handleChange} required />

            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              value={formData.phone} onChange={handleChange}
              required
              title="Please enter a Saudi phone number"
            />

            <button type="submit">Sign Up</button>
          </form>
        </div>
        <div className="signin" style={{ marginBottom: '50px' }}>
          <a href="/signin" style={{ color: 'black' }}>
            Signin
          </a>
        </div>
      </div>

      <footer>
        <p>© 2023 Eventique. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default SignUp;
