import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Import BrowserRouter
import Login from './components/login.jsx';
import Signup from './components/signup.jsx';
import Home from './components/home.jsx';
import Profile from './components/profile.jsx';
import '../src/App.css';
import ProblemList from './components/problemList.jsx';
import IndividualProblem from './components/individualProblem.jsx';
import CreateProblem from './components/addProblem.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter> 
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="problemList" element={<ProblemList/>}/>
          <Route path="/individualProblem/:id" element={<IndividualProblem/>} />
          <Route path ="/addProblem" element ={<CreateProblem/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
