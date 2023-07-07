
import './App.css';
import Home from './components/Home';
import Signup from './components/Signup';
import AdminDashBoard from './components/AdminDashBoard';
import UserDashBoard from './components/UserDashBoard';
import ExamPortal from './components/ExamPortal';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/AdminDashBoard" element={<AdminDashBoard/>} />
        <Route path="/UserDashBoard" element={<UserDashBoard/>}/>
        <Route path="/ExamPortal" element={<ExamPortal/>}/>
      </Routes>
      
    </div>
    </Router>
  );
}

export default App;
