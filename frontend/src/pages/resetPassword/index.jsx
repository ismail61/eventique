import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const user = localStorage.getItem('user');
  const { token } = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      alert('New password and confirm password do not match.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/user-auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': user,
        },
        body: JSON.stringify({
          token,
          password: newPassword,
        }),
      });

      const responseData = await response.json();
      if (responseData?.data) {
        toast.success('Successfully reset password');
        window.location.href = '/signin';
      } else {
        toast.error(responseData?.message || 'Failed to reset password');
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
          <h1>Reset Password</h1>

          <form onSubmit={handleSubmit}>

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

export default ResetPassword;
