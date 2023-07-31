// App.js
import './App.css';
import Home from './components/Home';
import Signup from './components/Signup';
import AdminDashBoard from './components/AdminDashBoard';
import ExamPortal from './components/ExamPortal';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserDashboard from './components/UserDashBoard'; // Move the import here
import InstructionPage from './components/InstructionPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/AdminDashBoard" element={<AdminDashBoard />} />
          <Route path="/UserDashBoard" element={<UserDashboard />} /> {/* Move UserDashboard route here */}
          <Route path="/ExamPortal/:subject" element={<ExamPortal />} />
          <Route path="/InstructionPage/:subject" element={<InstructionPage />} /> {/* Add subject param to the route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
