import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'User',
    secretKey: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setErrorMessage('Please enter a valid email address.');
        setLoading(false);
        return;
      }

      // Check if the role is "Admin" and the secret key is correct
      if (formData.role === 'Admin' && formData.secretKey !== '2853') {
        setErrorMessage('Incorrect Secret Key.');
        setLoading(false);
        return;
      }

      // Create payload for the POST request
      const payload = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role === 'Admin' ? 1 : 0,
      };

      // Send signup request to backend
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/signup`, payload);
      const { success } = response.data;
      if (success) {
        setErrorMessage('');
        // Redirect to login page
        navigate('/login');
      } else {
        setErrorMessage('Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during signup:', error.message);
      setErrorMessage('An error occurred. Please try again later.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-6">Sign Up</h2>
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium mb-2">Username</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
          <div className="relative">
            <input type={showPassword ? 'text' : 'password'} id="password" name="password" value={formData.password} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
            <button type="button" className="absolute inset-y-0 right-0 px-3 py-2" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="role" className="block text-sm font-medium mb-2">Role</label>
          <select id="role" name="role" value={formData.role} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        {formData.role === 'Admin' && (
          <div className="mb-4">
            <label htmlFor="secretKey" className="block text-sm font-medium mb-2">Secret Key</label>
            <input type="password" id="secretKey" name="secretKey" value={formData.secretKey} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
          </div>
        )}
        <button type="submit" className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
      <div className="mt-4 flex justify-between">
        <button className="text-indigo-600 hover:underline" onClick={() => navigate('/login')}>Already a Member? Login</button>
        <button className="text-indigo-600 hover:underline" onClick={() => navigate('/login')}>Login</button>
      </div>
    </div>
  );
};

export default Signup;
