import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProblemList = () => {
  const [problems, setProblems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/getAllProblems`);
        setProblems(response.data);
      } catch (error) {
        console.error('Error fetching problems:', error.message);
      }
    };

    fetchProblems();
  }, []);

  const handleDeleteProblem = async (problemId) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/profile`);
      const { success, role } = response.data;
      if (success && role === 1) {
        await axios.get(`${import.meta.env.VITE_BACKEND_URL}/deleteProblem/${problemId}`);
        console.log('Problem deleted successfully');
        // Refresh the problem list after deletion
        fetchProblems();
        // Show success message for 1 second
        setTimeout(() => {
          console.log('Problem deleted successfully');
        }, 1000);
      } else {
        console.error('You are not an admin, you cannot delete a problem');
      }
    } catch (error) {
      console.error('Error deleting problem:', error.message);
    }
  };
  

  return (
    <div>
      <nav>
        <button onClick={() => navigate('/home')}>Home</button>
        <button onClick={() => navigate('/addProblem')}>Add a Problem</button>
        <button onClick={handleDeleteProblem}>Delete a Problem</button>
      </nav>
      <div className="problem-list">
        {problems.map((problem) => (
          <div key={problem._id}>
            <h3>{problem.problemName}</h3>
            <p>Difficulty: {problem.difficulty}</p>
            <button onClick={() => navigate(`/individualProblem/${problem._id}`)}>Code</button>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProblemList;
