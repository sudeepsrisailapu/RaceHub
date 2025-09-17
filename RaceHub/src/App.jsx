import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import NavBar from './components/NavBar';
import RaceHub from './components/RaceHub';
import EventRegistration from './components/EventRegistration';
import Leaderboard from './components/Leaderboard';
import EventSchedule from './components/EventSchedule';
import DiscussionBoard from './components/DiscussionBoard';
import Footer from './components/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Logout from './components/auth/Logout';
import { auth } from './components/auth/Firebase';


function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="app-wrapper">
        <NavBar user={user} />
        <div className="page-container">
          <main className="main-content">
            <Routes>
              <Route path="/" element={<RaceHub />} />
              <Route path="/schedule" element={<EventSchedule user={user} />} />
              <Route path="/register" element={<EventRegistration user={user} />} />
              <Route path="/signup" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/discussion" element={<DiscussionBoard />} />
              <Route path="/logout" element={<Logout />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}


export default App;