import React, { useState, useEffect } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log('Fetching users from:', API_URL);
        setLoading(true);
        const response = await fetch(API_URL);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Users data received:', data);
        
        // Handle both paginated (.results) and plain array responses
        const usersData = data.results || data;
        setUsers(Array.isArray(usersData) ? usersData : []);
        
      } catch (err) {
        console.error('Error fetching users:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [API_URL]);

  if (loading) return <div className="text-center">Loading users...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h2">👤 Users</h1>
        <div className="btn-group" role="group">
          <button className="btn btn-outline-secondary">
            <i className="bi bi-funnel"></i> Filter
          </button>
          <button className="btn btn-outline-primary">
            <i className="bi bi-download"></i> Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title text-primary">{users.length}</h5>
              <p className="card-text text-muted">Total Users</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title text-success">
                {users.filter(user => user.is_active).length}
              </h5>
              <p className="card-text text-muted">Active Users</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title text-warning">
                {users.filter(user => !user.is_active).length}
              </h5>
              <p className="card-text text-muted">Inactive Users</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title text-info">
                {users.filter(user => new Date(user.date_joined) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length}
              </h5>
              <p className="card-text text-muted">New (30 days)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="card-title mb-0">User Directory</h5>
          <div className="input-group" style={{width: '300px'}}>
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Search users..."
            />
          </div>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th scope="col">
                    <i className="bi bi-person-circle me-2"></i>User
                  </th>
                  <th scope="col">
                    <i className="bi bi-envelope me-2"></i>Email
                  </th>
                  <th scope="col">
                    <i className="bi bi-calendar-event me-2"></i>Joined
                  </th>
                  <th scope="col">
                    <i className="bi bi-check-circle me-2"></i>Status
                  </th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      <div className="text-muted">
                        <i className="bi bi-people fs-1 d-block mb-2"></i>
                        No users found.
                      </div>
                    </td>
                  </tr>
                ) : (
                  users.map((user, index) => (
                    <tr key={user.id || index}>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="avatar bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" 
                               style={{width: '40px', height: '40px'}}>
                            {(user.first_name?.[0] || user.username?.[0] || 'U').toUpperCase()}
                          </div>
                          <div>
                            <div className="fw-bold">
                              {user.first_name && user.last_name 
                                ? `${user.first_name} ${user.last_name}` 
                                : user.username || 'N/A'
                              }
                            </div>
                            <div className="text-muted small">@{user.username || 'N/A'}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <a href={`mailto:${user.email}`} className="link-primary text-decoration-none">
                          {user.email || 'N/A'}
                        </a>
                      </td>
                      <td>
                        {user.date_joined 
                          ? new Date(user.date_joined).toLocaleDateString()
                          : <span className="text-muted">N/A</span>
                        }
                      </td>
                      <td>
                        <span className={`badge ${user.is_active ? 'bg-success' : 'bg-secondary'}`}>
                          <i className={`bi ${user.is_active ? 'bi-check-circle' : 'bi-x-circle'} me-1`}></i>
                          {user.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <div className="btn-group" role="group">
                          <button className="btn btn-sm btn-outline-primary" title="View Profile">
                            <i className="bi bi-eye"></i>
                          </button>
                          <button className="btn btn-sm btn-outline-secondary" title="Edit User">
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button className="btn btn-sm btn-outline-danger" title="Delete User">
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

export default Users;