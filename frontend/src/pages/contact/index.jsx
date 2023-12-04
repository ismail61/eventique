import React, { useState } from 'react';
import './index.css';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const user = localStorage.getItem('user');
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/user/inquery/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': user,
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      if (responseData?.data) {
        toast.success('Successfully added a contact');
      } else {
        toast.error(responseData?.message || 'Failed to add a contact');
      }
    } catch (error) {
      console.log(error);
      toast.error('Invalid Request');
    }
  };
  return (
    <div>
      <nav>
        <NavLink to={'/'}>
          <div className="">
            <img src="../images/logo.png" height={"100px"} width={"100px"} alt="Eventique Logo" />
          </div>
        </NavLink>
      </nav>
      <section className="hero">
        <div className="hero-content">
          <h1>Need Help?</h1>
          <h2>Please feel free to reach us by filling out the form below!</h2>
          <div className="container">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" required
                  value={formData.name}
                  onChange={handleChange} />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required
                  value={formData.email}
                  onChange={handleChange} />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message:</label>
                <textarea id="message" name="message" required
                  value={formData.message}
                  onChange={handleChange}></textarea>
              </div>

              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </section>
      <footer>
        <p>&copy; 2023 Eventique. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Contact;
