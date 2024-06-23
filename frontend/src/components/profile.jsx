import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['userEmail']);
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
  const handleLogout = () => {
    removeCookie("userEmail"); // Remove the userEmail cookie
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", color: "#333" }}>
      <nav style={{ marginBottom: "20px" }}>
        <button
          onClick={() => navigate("/home")}
          style={{
            marginRight: "10px",
            padding: "8px 16px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            backgroundColor: "#007BFF",
            color: "#fff",
            cursor: "pointer"
          }}
        >
          Home
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
          <button
          onClick={handleLogout}
          style={{
            marginRight: "1rem",
            padding: "0.5rem 1rem",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Log Out
        </button>
        <button
          onClick={() => navigate("/problemList")}
          style={{
            marginRight: "10px",
            padding: "8px 16px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            backgroundColor: "#007BFF",
            color: "#fff",
            cursor: "pointer"
          }}
        >
          Problem List
        </button>
        <button
          onClick={() => navigate("/updateProfile")}
          style={{
            marginRight: "10px",
            padding: "8px 16px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            backgroundColor: "#007BFF",
            color: "#fff",
            cursor: "pointer"
          }}
        >
          Update Profile
        </button>
        <button
          onClick={handleDeleteAccount}
          style={{
            padding: "8px 16px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            backgroundColor: "#DC3545",
            color: "#fff",
            cursor: "pointer"
          }}
        >
          Delete Account
        </button>
      </nav>
      <div>
        {userData && (
          <div>
            <h2>User Profile</h2>
            <p>
              <strong>Name:</strong> {userData.username}
            </p>
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
            <p>
              <strong>Role:</strong>{" "}
              {userData.role === 1 ? "Admin" : "User"}
            </p>
            <p>
              <strong>Problems Solved:</strong>{" "}
              {userData.problemsSolved.length}
            </p>
          </div>
        )}
      </div>
    </div>
  );
  
};

export default Profile;
