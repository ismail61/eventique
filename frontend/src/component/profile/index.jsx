import React, { useEffect, useState } from 'react';
import './index.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProfileSettings = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    region: 'north',
  });
  const user = localStorage.getItem('user');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/user/account', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': user,
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      if (responseData?.data) {
        toast.success('Successfully Updated user info');
        fetchUserInfo();
      } else {
        toast.error(responseData?.message || 'Failed to update your info');
      }

    } catch (error) {
      console.error('Error during update info:', error.message);;
      toast.error('Failed to update your info');
    }
  };

  const fetchUserInfo = async () => {
    try {
      const response = await fetch(`http://localhost:3001/user/account`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': user,
        },
      });

      const responseData = await response.json();
      if (responseData?.data) {
        setFormData(responseData?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserInfo();
    } else {
      navigate('/signin')
    }
  }, [])

  return (
    <div>
      {/* Navigation */}
      <nav>
        <NavLink to={'/'}>
          <div className="">
            <img src="images/logo.png" height={"100px"} width={"100px"} alt="Eventique Logo" />
          </div>
        </NavLink>
        <div className="tabs">
          <ul>
            <li>
              <a href="/contact">
                <button className="tab">
                  Contact
                </button>
              </a>
            </li>
            {!user ?
              (<>
                <li>
                  <a href="/signin">
                    <button className="tab">Sign In</button>
                  </a>
                </li>
                <li>
                  <a href="/signup">
                    <button className="tab">Signup</button>
                  </a>
                </li></>) :
              <>
                <li>
                  <a href="/logout">
                    <button className="tab">Log out</button>
                  </a>
                </li>
                <li>
                  <a href="/orders">
                    <button className="tab">Orders</button>
                  </a>
                </li>
                <li>
                  <a href="/change-password">
                    <button className="tab">Change Password</button>
                  </a>
                </li></>
            }

          </ul>
        </div>
      </nav>
      <div className="websiteContent_service" style={{ height: '100vh' }}>

        <div className="profile-settings">
          <h2>Profile Settings</h2>
          <form onSubmit={handleSaveChanges}>
            {/* Form fields with controlled components */}
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} />

            <label htmlFor="phone">Phone Number</label>
            <input type="text" id="phone" name="phone" placeholder="Enter your phone number" value={formData.phone} onChange={handleChange} />

            <label htmlFor="region">Region</label>
            <select id="region" name="region" value={formData.region} onChange={handleChange}>
              <option value="north">North of Riyadh</option>
              <option value="south">South of Riyadh</option>
              <option value="west">West of Riyadh</option>
              <option value="east">East of Riyadh</option>
            </select>

            <span style={{ textAlign: 'center', marginTop: '10px' }}>
              <button style={{ width: '150px' }} type="submit">Save Changes</button>
            </span>
          </form>
        </div>
      </div>
      {/* Footer */}
      <footer>
        <p>&copy; 2023 Eventique. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ProfileSettings;
