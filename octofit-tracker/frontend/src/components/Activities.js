import React, { useState, useEffect } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        console.log('Fetching activities from:', API_URL);
        setLoading(true);
        const response = await fetch(API_URL);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Activities data received:', data);
        
        // Handle both paginated (.results) and plain array responses
        const activitiesData = data.results || data;
        setActivities(Array.isArray(activitiesData) ? activitiesData : []);
        
      } catch (err) {
        console.error('Error fetching activities:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [API_URL]);

  if (loading) return <div className="text-center">Loading activities...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h2">📊 Activities</h1>
        <button className="btn btn-primary">
          <i className="bi bi-plus-lg"></i> Add Activity
        </button>
      </div>
      
      {/* Summary Cards */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title text-primary">{activities.length}</h5>
              <p className="card-text text-muted">Total Activities</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title text-success">
                {activities.reduce((sum, a) => sum + (a.calories || 0), 0)}
              </h5>
              <p className="card-text text-muted">Total Calories</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title text-info">
                {activities.reduce((sum, a) => sum + (a.duration || 0), 0)}
              </h5>
              <p className="card-text text-muted">Total Minutes</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title text-warning">
                {activities.length > 0 ? Math.round(activities.reduce((sum, a) => sum + (a.duration || 0), 0) / activities.length) : 0}
              </h5>
              <p className="card-text text-muted">Avg Duration</p>
            </div>
          </div>
        </div>
      </div>

      {/* Activities Table */}
      <div className="card">
        <div className="card-header">
          <h5 className="card-title mb-0">Activity Log</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Activity</th>
                  <th scope="col">Description</th>
                  <th scope="col">Duration</th>
                  <th scope="col">Calories</th>
                  <th scope="col">Date</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {activities.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      <div className="text-muted">
                        <i className="bi bi-activity fs-1 d-block mb-2"></i>
                        No activities found. <button className="btn btn-link p-0 link-primary">Add your first activity</button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  activities.map((activity, index) => (
                    <tr key={activity.id || index}>
                      <td>
                        <strong>{activity.name || activity.title || 'Activity'}</strong>
                      </td>
                      <td>{activity.description || 'No description available'}</td>
                      <td>
                        {activity.duration ? (
                          <span className="badge bg-info">{activity.duration} min</span>
                        ) : (
                          <span className="text-muted">N/A</span>
                        )}
                      </td>
                      <td>
                        {activity.calories ? (
                          <span className="badge bg-success">{activity.calories} cal</span>
                        ) : (
                          <span className="text-muted">N/A</span>
                        )}
                      </td>
                      <td>
                        {activity.date 
                          ? new Date(activity.date).toLocaleDateString()
                          : <span className="text-muted">N/A</span>
                        }
                      </td>
                      <td>
                        <div className="btn-group" role="group">
                          <button className="btn btn-sm btn-outline-primary" title="Edit">
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button className="btn btn-sm btn-outline-danger" title="Delete">
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;