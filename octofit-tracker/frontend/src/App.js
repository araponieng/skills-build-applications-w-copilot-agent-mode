import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  const API_BASE_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/`;
  
  console.log('OctoFit Tracker App initialized');
  console.log('API Base URL:', API_BASE_URL);
  console.log('Codespace Name:', process.env.REACT_APP_CODESPACE_NAME);

  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container">
            <Link className="navbar-brand" to="/">
              <strong>🐙 OctoFit Tracker</strong>
            </Link>
            
            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">Activities</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">Workouts</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">Teams</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">Users</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-light text-center py-3 mt-5">
          <div className="container">
            <p className="text-muted mb-0">
              OctoFit Tracker - Your Fitness Journey Starts Here 💪
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

// Home Component
const Home = () => {
  return (
    <div className="container mt-4">
      <div className="jumbotron bg-primary text-white p-5 rounded text-shadow">
        <h1 className="display-4">Welcome to OctoFit Tracker! 🐙</h1>
        <p className="lead">
          Track your activities, join teams, compete on leaderboards, and discover personalized workouts.
        </p>
        <hr className="my-4" />
        <p>
          Get started by exploring your fitness journey with our comprehensive tracking tools.
        </p>
        <div className="row mt-4">
          <div className="col-md-3 mb-3">
            <Link to="/activities" className="btn btn-light btn-lg w-100 text-shadow">
              📊 Activities
            </Link>
          </div>
          <div className="col-md-3 mb-3">
            <Link to="/workouts" className="btn btn-light btn-lg w-100 text-shadow">
              💪 Workouts
            </Link>
          </div>
          <div className="col-md-3 mb-3">
            <Link to="/teams" className="btn btn-light btn-lg w-100 text-shadow">
              👥 Teams
            </Link>
          </div>
          <div className="col-md-3 mb-3">
            <Link to="/leaderboard" className="btn btn-light btn-lg w-100 text-shadow">
              🏆 Leaderboard
            </Link>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-4 mb-4">
          <div className="card h-100 border-start-primary">
            <div className="card-body text-center">
              <i className="bi bi-graph-up-arrow fs-1 text-primary mb-3"></i>
              <h5 className="card-title">🎯 Track Activities</h5>
              <p className="card-text">Log your daily fitness activities and monitor your progress over time with detailed analytics.</p>
              <button className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#activityModal">
                Learn More
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100 border-start-success">
            <div className="card-body text-center">
              <i className="bi bi-people-fill fs-1 text-success mb-3"></i>
              <h5 className="card-title">👨‍👩‍👧‍👦 Join Teams</h5>
              <p className="card-text">Create or join fitness teams and motivate each other to reach your goals together.</p>
              <button className="btn btn-outline-success">
                Find Teams
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100 border-start-warning">
            <div className="card-body text-center">
              <i className="bi bi-trophy-fill fs-1 text-warning mb-3"></i>
              <h5 className="card-title">🏅 Compete</h5>
              <p className="card-text">Check the leaderboard and see how you rank against other fitness enthusiasts.</p>
              <button className="btn btn-outline-warning">
                View Rankings
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Example */}
      <div className="modal fade" id="activityModal" tabIndex="-1" aria-labelledby="activityModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="activityModalLabel">
                <i className="bi bi-activity me-2"></i>Activity Tracking
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>Track various activities including:</p>
              <ul className="list-group list-group-flush">
                <li className="list-group-item"><i className="bi bi-bicycle text-primary me-2"></i>Cycling</li>
                <li className="list-group-item"><i className="bi bi-heart-pulse text-danger me-2"></i>Running</li>
                <li className="list-group-item"><i className="bi bi-water text-info me-2"></i>Swimming</li>
                <li className="list-group-item"><i className="bi bi-lightning text-warning me-2"></i>Strength Training</li>
              </ul>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <Link to="/activities" className="btn btn-primary" data-bs-dismiss="modal">
                Start Tracking
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
