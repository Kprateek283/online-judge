import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [profileData, setProfileData] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['userEmail']); // Change to 'userEmail' cookie
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
          setCookie('userEmail', email, { path: '/' }); // Store userEmail cookie with path '/'
        } else {
          console.error('Error fetching user profile');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error.message);
      }
    };
  
    fetchProfile();
  }, [cookies.userEmail, setCookie]); // Include cookies.userEmail and setCookie in dependency array

  const handleLogout = () => {
    removeCookie('userEmail'); // Remove the userEmail cookie
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <nav style={{ marginBottom: '2rem' }}>
        <button 
          onClick={handleLogout} 
          style={{ marginRight: '1rem', padding: '0.5rem 1rem', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Log Out
        </button>
        <button 
          onClick={() => navigate('/profile')} 
          style={{ marginRight: '1rem', padding: '0.5rem 1rem', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Profile
        </button>
        <button 
          onClick={() => navigate('/problemList')} 
          style={{ marginRight: '1rem', padding: '0.5rem 1rem', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Problem List
        </button>
        <button 
          onClick={() => navigate('/getLeaderboard')} 
          style={{ padding: '0.5rem 1rem', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Leaderboard
        </button>
      </nav>
      <div>
        {profileData ? (
          <p style={{ fontSize: '1.2rem' }}>Welcome Back <strong>{profileData.username}</strong></p>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>
    </div>
  );
  
};

export default Home;
