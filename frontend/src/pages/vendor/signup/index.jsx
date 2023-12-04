import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const VendorSignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    iban: '',
    code: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {

    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/vendor-auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      if (responseData?.data) {
        toast.success('Successfully Signed Up');
        setTimeout(() => {
          navigate('/vendor/signin');
        }, 3000);
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
              <a href="/vendor/signin">
                <button className="tab">Sign in</button>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div className="hero">
        <div className="hero-content">
          <h1>Vendor Sign Up</h1>
          <form className="signup-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              title="Please enter a Saudi phone number"
            />

            <label htmlFor="iban">IBAN (Saudi Bank Account)</label>
            <input
              type="text"
              id="iban"
              name="iban"
              value={formData.iban}
              onChange={handleChange}
              required
            />

            <label htmlFor="vendor-code">Vendor Code</label>
            <input
              type="text"
              id="code"
              name="code"
              value={formData.code}
              onChange={handleChange}
              required
            />

            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>

      <footer>
        <p>© 2023 Eventique. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default VendorSignUp;
