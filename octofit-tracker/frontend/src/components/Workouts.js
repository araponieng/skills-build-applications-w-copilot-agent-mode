import React, { useState, useEffect } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        console.log('Fetching workouts from:', API_URL);
        setLoading(true);
        const response = await fetch(API_URL);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Workouts data received:', data);
        
        // Handle both paginated (.results) and plain array responses
        const workoutsData = data.results || data;
        setWorkouts(Array.isArray(workoutsData) ? workoutsData : []);
        
      } catch (err) {
        console.error('Error fetching workouts:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, [API_URL]);

  if (loading) return <div className="text-center">Loading workouts...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h2">💪 Workouts</h1>
        <div className="btn-group" role="group">
          <button className="btn btn-outline-secondary">
            <i className="bi bi-funnel"></i> Filter
          </button>
          <button className="btn btn-primary">
            <i className="bi bi-plus-lg"></i> Add Workout
          </button>
        </div>
      </div>

      {/* Filter Pills */}
      <div className="mb-4">
        <h6 className="text-muted mb-2">Filter by Difficulty:</h6>
        <div className="btn-group" role="group">
          <input type="radio" className="btn-check" name="difficulty" id="all" autoComplete="off" defaultChecked />
          <label className="btn btn-outline-secondary" htmlFor="all">All</label>
          
          <input type="radio" className="btn-check" name="difficulty" id="easy" autoComplete="off" />
          <label className="btn btn-outline-success" htmlFor="easy">Easy</label>
          
          <input type="radio" className="btn-check" name="difficulty" id="medium" autoComplete="off" />
          <label className="btn btn-outline-warning" htmlFor="medium">Medium</label>
          
          <input type="radio" className="btn-check" name="difficulty" id="hard" autoComplete="off" />
          <label className="btn btn-outline-danger" htmlFor="hard">Hard</label>
        </div>
      </div>

      {/* Workouts Grid */}
      <div className="row">
        {workouts.length === 0 ? (
          <div className="col-12">
            <div className="card text-center py-5">
              <div className="card-body">
                <i className="bi bi-activity fs-1 text-muted d-block mb-3"></i>
                <h5 className="card-title">No Workouts Found</h5>
                <p className="card-text text-muted">Discover personalized workouts to reach your fitness goals!</p>
                <button className="btn btn-primary">Browse Workout Library</button>
              </div>
            </div>
          </div>
        ) : (
          workouts.map((workout, index) => (
            <div key={workout.id || index} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h6 className="card-title mb-0">{workout.name || workout.title || 'Workout'}</h6>
                  {workout.difficulty && (
                    <span className={`badge ${
                      workout.difficulty === 'easy' ? 'bg-success' :
                      workout.difficulty === 'medium' ? 'bg-warning text-dark' :
                      workout.difficulty === 'hard' ? 'bg-danger' : 'bg-secondary'
                    }`}>
                      {workout.difficulty.charAt(0).toUpperCase() + workout.difficulty.slice(1)}
                    </span>
                  )}
                </div>
                <div className="card-body">
                  <p className="card-text">{workout.description || 'No description available'}</p>
                  
                  <div className="row mb-3">
                    {workout.duration && (
                      <div className="col-6 text-center">
                        <div className="border-end">
                          <h6 className="text-primary mb-0">{workout.duration}</h6>
                          <small className="text-muted">Minutes</small>
                        </div>
                      </div>
                    )}
                    {workout.calories_estimate && (
                      <div className="col-6 text-center">
                        <h6 className="text-success mb-0">{workout.calories_estimate}</h6>
                        <small className="text-muted">Calories</small>
                      </div>
                    )}
                  </div>

                  {workout.muscle_groups && (
                    <div className="mb-2">
                      <small className="text-muted">Target:</small>
                      <div className="mt-1">
                        {workout.muscle_groups.split(',').map((group, idx) => (
                          <span key={idx} className="badge bg-info me-1 mb-1">
                            {group.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {workout.equipment && (
                    <div className="mb-2">
                      <small className="text-muted">Equipment:</small>
                      <span className="ms-1">{workout.equipment}</span>
                    </div>
                  )}
                </div>
                <div className="card-footer">
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">
                      {workout.created_at 
                        ? new Date(workout.created_at).toLocaleDateString()
                        : 'Suggested'
                      }
                    </small>
                    <div className="btn-group" role="group">
                      <button className="btn btn-sm btn-outline-primary">View</button>
                      <button className="btn btn-sm btn-success">Start</button>
                    </div>
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

export default Workouts;