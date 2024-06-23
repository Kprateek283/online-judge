import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const GetLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [cookies] = useCookies(['userEmail']); // Change to 'userEmail' cookie
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const email = cookies.userEmail;
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/leaderboard`);
        const leaderboardData = response.data;

        // Assign ranks based on the order of problems solved (assuming it's already sorted in the backend)
        const rankedLeaderboard = leaderboardData.map((entry, index) => ({
          ...entry,
          rank: index + 1
        }));

        setLeaderboard(rankedLeaderboard); // Update state with ranked leaderboard
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        // Handle error state or display a message
      }
    };

    fetchLeaderboard();
  }, [cookies.userEmail]); // Trigger useEffect when userEmail cookie changes

  // Function to format rank text
  const formatRankText = (rank) => {
    if (rank === 1) {
      return '1st';
    } else if (rank === 2) {
      return '2nd';
    } else if (rank === 3) {
      return '3rd';
    } else {
      return `${rank}th`;
    }
  };

  const handleLogout = () => {
    removeCookie('userEmail'); // Remove the userEmail cookie
    navigate('/login'); // Redirect to login page after logout
  };

  // Find current user's rank and username for displaying "Your Rank"
  const currentUserEmail = cookies.userEmail;
  const currentUserEntry = leaderboard.find(entry => entry.email === currentUserEmail);
  const currentUserRank = currentUserEntry ? currentUserEntry.rank : null;
  const currentUserUsername = currentUserEntry ? currentUserEntry.username : null;

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <nav style={{ marginBottom: '2rem' }}>
        <button 
          onClick={() => navigate('/profile')} 
          style={{ marginRight: '1rem', padding: '0.5rem 1rem', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Profile
        </button>
        <button 
          onClick={() => navigate('/home')} 
          style={{ marginRight: '1rem', padding: '0.5rem 1rem', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Home
        </button>
        <button 
          onClick={() => navigate('/problemList')} 
          style={{ marginRight: '1rem',padding: '0.5rem 1rem', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Problem List
        </button>
       <button 
          onClick={handleLogout} 
          style={{ marginRight: '1rem', padding: '0.5rem 1rem', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Log Out
        </button>
        <button
            style={{
              marginRight: "1rem",
              marginBottom: "16px",
              padding: "8px",
              backgroundColor: "#4CAF50",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        
      </nav>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Leaderboard</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '2rem' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Rank</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Username</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Problems Solved</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map(entry => (
            <tr key={entry._id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{entry.rank}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{entry.username}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{entry.noProblemsSolved}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {currentUserRank && currentUserUsername && (
        <div style={{ padding: '1rem', backgroundColor: '#f9f9f9', borderRadius: '4px', textAlign: 'center' }}>
          <p>Your Rank: {formatRankText(currentUserRank)}</p>
          <p>{currentUserUsername} - Problems Solved: {currentUserEntry.noProblemsSolved}</p>
        </div>
      )}
    </div>
  );
  
  
};

export default GetLeaderboard;
