import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [cookies] = useCookies(['userID']);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/profile`, { email: cookies.userEmail });
        const { success, profile } = response.data;
        if (success) {
          setUserData(profile);
        } else {
          console.error('Error fetching user profile');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error.message);
      }
    };

    fetchUserProfile();
  }, [cookies.userEmail]);

  const handleDeleteAccount = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/deleteUser`, { email: cookies.userEmail });
      const { success } = response.data;
      if (success) {
        console.log('Account deleted successfully');
        navigate('/login');
      } else {
        console.error('Error deleting account');
      }
    } catch (error) {
      console.error('Error deleting account:', error.message);
    }
  };

  return (
    <div>
      <nav>
        <button onClick={() => navigate('/home')}>Home</button>
        <button onClick={() => navigate('/problemList')}>Problem List</button>
        <button onClick={handleDeleteAccount}>Delete Account</button>
      </nav>
      <div className="profile-info">
        {userData && (
          <div>
            <h2>User Profile</h2>
            <p><strong>Name:</strong> {userData.username}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Role:</strong> {userData.role === 1 ? 'Admin' : 'User'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
