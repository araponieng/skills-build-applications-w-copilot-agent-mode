import React, { useState, useEffect } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        console.log('Fetching leaderboard from:', API_URL);
        setLoading(true);
        const response = await fetch(API_URL);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Leaderboard data received:', data);
        
        // Handle both paginated (.results) and plain array responses
        const leaderboardData = data.results || data;
        setLeaderboard(Array.isArray(leaderboardData) ? leaderboardData : []);
        
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [API_URL]);

  if (loading) return <div className="text-center">Loading leaderboard...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h2">🏆 Leaderboard</h1>
        <div className="btn-group" role="group">
          <button className="btn btn-outline-secondary">
            <i className="bi bi-arrow-clockwise"></i> Refresh
          </button>
          <button className="btn btn-outline-primary">
            <i className="bi bi-calendar-week"></i> This Week
          </button>
        </div>
      </div>

      {/* Top 3 Podium */}
      {leaderboard.length >= 3 && (
        <div className="row mb-5">
          <div className="col-12">
            <div className="card bg-gradient" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
              <div className="card-body text-white text-center py-4">
                <h4 className="mb-4">🥇 Top Performers</h4>
                <div className="row">
                  {/* 2nd Place */}
                  <div className="col-md-4 mb-3">
                    <div className="podium-place">
                      <div className="position-relative">
                        <div className="bg-white text-dark rounded-circle mx-auto d-flex align-items-center justify-content-center" 
                             style={{width: '60px', height: '60px', fontSize: '24px', fontWeight: 'bold'}}>
                          {(leaderboard[1]?.username?.[0] || '2').toUpperCase()}
                        </div>
                        <span className="badge bg-light text-dark position-absolute" style={{top: '-5px', right: '-5px'}}>
                          🥈
                        </span>
                      </div>
                      <h6 className="mt-2 mb-1">{leaderboard[1]?.username || 'Player 2'}</h6>
                      <p className="mb-0">{leaderboard[1]?.points || leaderboard[1]?.score || 0} points</p>
                    </div>
                  </div>
                  
                  {/* 1st Place */}
                  <div className="col-md-4 mb-3">
                    <div className="podium-place">
                      <div className="position-relative">
                        <div className="bg-warning text-dark rounded-circle mx-auto d-flex align-items-center justify-content-center" 
                             style={{width: '80px', height: '80px', fontSize: '32px', fontWeight: 'bold'}}>
                          {(leaderboard[0]?.username?.[0] || '1').toUpperCase()}
                        </div>
                        <span className="badge bg-warning text-dark position-absolute" style={{top: '-10px', right: '-10px'}}>
                          🥇
                        </span>
                      </div>
                      <h5 className="mt-2 mb-1">{leaderboard[0]?.username || 'Player 1'}</h5>
                      <p className="mb-0 h6">{leaderboard[0]?.points || leaderboard[0]?.score || 0} points</p>
                    </div>
                  </div>
                  
                  {/* 3rd Place */}
                  <div className="col-md-4 mb-3">
                    <div className="podium-place">
                      <div className="position-relative">
                        <div className="bg-white text-dark rounded-circle mx-auto d-flex align-items-center justify-content-center" 
                             style={{width: '60px', height: '60px', fontSize: '24px', fontWeight: 'bold'}}>
                          {(leaderboard[2]?.username?.[0] || '3').toUpperCase()}
                        </div>
                        <span className="badge bg-light text-dark position-absolute" style={{top: '-5px', right: '-5px'}}>
                          🥉
                        </span>
                      </div>
                      <h6 className="mt-2 mb-1">{leaderboard[2]?.username || 'Player 3'}</h6>
                      <p className="mb-0">{leaderboard[2]?.points || leaderboard[2]?.score || 0} points</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Leaderboard Table */}
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="card-title mb-0">Complete Rankings</h5>
          <div className="btn-group" role="group">
            <input type="radio" className="btn-check" name="period" id="week" autoComplete="off" defaultChecked />
            <label className="btn btn-outline-primary btn-sm" htmlFor="week">Week</label>
            
            <input type="radio" className="btn-check" name="period" id="month" autoComplete="off" />
            <label className="btn btn-outline-primary btn-sm" htmlFor="month">Month</label>
            
            <input type="radio" className="btn-check" name="period" id="year" autoComplete="off" />
            <label className="btn btn-outline-primary btn-sm" htmlFor="year">Year</label>
          </div>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th scope="col">
                    <i className="bi bi-trophy me-2"></i>Rank
                  </th>
                  <th scope="col">
                    <i className="bi bi-person me-2"></i>User
                  </th>
                  <th scope="col">
                    <i className="bi bi-star me-2"></i>Points
                  </th>
                  <th scope="col">
                    <i className="bi bi-activity me-2"></i>Activities
                  </th>
                  <th scope="col">
                    <i className="bi bi-calendar me-2"></i>Last Activity
                  </th>
                  <th scope="col">Progress</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      <div className="text-muted">
                        <i className="bi bi-trophy fs-1 d-block mb-2"></i>
                        No leaderboard data available. Start logging activities to see rankings!
                      </div>
                    </td>
                  </tr>
                ) : (
                  leaderboard.map((entry, index) => {
                    const rank = entry.rank || index + 1;
                    const points = entry.points || entry.score || 0;
                    const maxPoints = Math.max(...leaderboard.map(e => e.points || e.score || 0));
                    const progressPercentage = maxPoints > 0 ? (points / maxPoints) * 100 : 0;
                    
                    return (
                      <tr key={entry.id || index} className={rank <= 3 ? 'table-warning' : ''}>
                        <td>
                          <div className="d-flex align-items-center">
                            <span className={`badge ${
                              rank === 1 ? 'bg-warning text-dark' :
                              rank === 2 ? 'bg-secondary' :
                              rank === 3 ? 'bg-warning text-dark' : 'bg-light text-dark'
                            } me-2`}>
                              {rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : rank}
                            </span>
                            <span className="fw-bold">#{rank}</span>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="avatar bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" 
                                 style={{width: '35px', height: '35px'}}>
                              {(entry.username?.[0] || entry.user?.[0] || entry.name?.[0] || 'U').toUpperCase()}
                            </div>
                            <span className="fw-bold">{entry.username || entry.user || entry.name || 'Unknown User'}</span>
                          </div>
                        </td>
                        <td>
                          <span className="badge bg-success fs-6">{points}</span>
                        </td>
                        <td>
                          <span className="badge bg-info">{entry.total_activities || entry.activities_count || 0}</span>
                        </td>
                        <td>
                          {entry.last_activity 
                            ? new Date(entry.last_activity).toLocaleDateString()
                            : <span className="text-muted">N/A</span>
                          }
                        </td>
                        <td>
                          <div className="progress" style={{height: '20px'}}>
                            <div 
                              className="progress-bar bg-success" 
                              role="progressbar" 
                              style={{width: `${progressPercentage}%`}}
                              aria-valuenow={progressPercentage} 
                              aria-valuemin="0" 
                              aria-valuemax="100"
                            >
                              {progressPercentage > 15 && `${Math.round(progressPercentage)}%`}
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;