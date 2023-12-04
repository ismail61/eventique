import React, { useState } from 'react';
import './index.css';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const user = localStorage.getItem('user');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Current password validation
    if (currentPassword.trim() === '') {
      alert('Please enter your current password.');
      return;
    }

    // New password validation
    if (newPassword.trim() === '') {
      alert('Please enter your new password.');
      return;
    }

    // Confirm new password validation
    if (confirmPassword.trim() === '') {
      alert('Please confirm your new password.');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('New password and confirm password do not match.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/user/account/change-password', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': user,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword
        }),
      });

      const responseData = await response.json();
      if (responseData?.data) {
        toast.success('Successful');
        localStorage.clear();
        alert('Logged out successfully!');
        window.location.href = '/signin';
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
      <nav>
        <NavLink to={'/'}>
          <div className="">
            <img src="../images/logo.png" height={"100px"} width={"100px"} alt="Eventique Logo" />
          </div>
        </NavLink>

        <div className="tabs">
          <ul>
            <li><a href="/about"> <button className="tab">About Us</button></a></li>
            <li><a href="/faq"><button className="tab">FAQ</button></a></li>
            <li><a href="/logout"><button className="tab">Log out</button></a></li>
          </ul>
        </div>
      </nav>

      <div className='hero_change_password'>
        <div className="change-password">
          <h2>Change Password</h2>

          <form onSubmit={handleSubmit} id="change-password-form">
            <label htmlFor="current-password">Current Password</label>
            <input
              type="password"
              id="current-password"
              name="current-password"
              placeholder="Enter your current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />

            <label htmlFor="new-password">New Password</label>
            <input
              type="password"
              id="new-password"
              name="new-password"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

            <label htmlFor="confirm-password">Confirm New Password</label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button type="submit">Change Password</button>
          </form>
        </div></div>

      <footer>
        <p>&copy; 2023 Eventique. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ChangePassword;
