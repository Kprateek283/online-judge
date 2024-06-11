import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [profileData, setProfileData] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['userID']);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const email = cookies.userEmail; // Get the email from cookies
  
        // Check if email is available
        if (!email) {
          console.error('Email not found in cookies');
          return;
        }
  
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/profile`, { email });
        const { success, profile } = response.data;
        if (success) {
          setProfileData(profile); // Store the profile data in state
        } else {
          console.error('Error fetching user profile');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error.message);
      }
    };
  
    fetchProfile();
  }, []);
  

  const handleLogout = () => {
    removeCookie('userID'); // Remove the userID cookie
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div>
      <nav>
        <button onClick={handleLogout}>Log Out</button>
        <button onClick={() => navigate('/profile')}>Profile</button>
        <button onClick={() => navigate('/problemList')}>Problem List</button>
      </nav>
      <div className="welcome-message">
        {profileData && (
          <p>Welcome Back <strong>{profileData.username}</strong></p>
        )}
      </div>
    </div>
  );
};

export default Home;
