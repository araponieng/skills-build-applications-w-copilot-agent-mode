import React, { useState, useEffect } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        console.log('Fetching teams from:', API_URL);
        setLoading(true);
        const response = await fetch(API_URL);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Teams data received:', data);
        
        // Handle both paginated (.results) and plain array responses
        const teamsData = data.results || data;
        setTeams(Array.isArray(teamsData) ? teamsData : []);
        
      } catch (err) {
        console.error('Error fetching teams:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, [API_URL]);

  if (loading) return <div className="text-center">Loading teams...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h2">👥 Teams</h1>
        <button className="btn btn-primary">
          <i className="bi bi-plus-lg"></i> Create Team
        </button>
      </div>

      {/* Teams Grid */}
      <div className="row">
        {teams.length === 0 ? (
          <div className="col-12">
            <div className="card text-center py-5">
              <div className="card-body">
                <i className="bi bi-people fs-1 text-muted d-block mb-3"></i>
                <h5 className="card-title">No Teams Found</h5>
                <p className="card-text text-muted">Create your first team and start building your fitness community!</p>
                <button className="btn btn-primary">Create Your First Team</button>
              </div>
            </div>
          </div>
        ) : (
          teams.map((team, index) => (
            <div key={team.id || index} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0">{team.name || 'Team'}</h5>
                  <span className={`badge ${team.is_active ? 'bg-success' : 'bg-secondary'}`}>
                    {team.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="card-body">
                  <p className="card-text">{team.description || 'No description available'}</p>
                  
                  <div className="row text-center mb-3">
                    <div className="col-6">
                      <div className="border-end">
                        <h6 className="text-primary mb-0">{team.member_count || 0}</h6>
                        <small className="text-muted">Members</small>
                      </div>
                    </div>
                    <div className="col-6">
                      <h6 className="text-success mb-0">{team.total_points || 0}</h6>
                      <small className="text-muted">Points</small>
                    </div>
                  </div>

                  {team.captain && (
                    <div className="mb-2">
                      <small className="text-muted">Captain:</small>
                      <span className="ms-1 fw-bold">{team.captain}</span>
                    </div>
                  )}
                  
                  {team.created_at && (
                    <div className="mb-2">
                      <small className="text-muted">Created:</small>
                      <span className="ms-1">{new Date(team.created_at).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
                <div className="card-footer">
                  <div className="btn-group w-100" role="group">
                    <button className="btn btn-outline-primary btn-sm">View</button>
                    <button className="btn btn-outline-success btn-sm">Join</button>
                    <button className="btn btn-outline-secondary btn-sm">Details</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Teams;