import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { environment } from '../environment.ts';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const apiUrl = environment.apiUrl;

  const fetchUsers = (query = '') => {

    fetch(`${apiUrl}/api/user/searchuser?query=${query}`, { credentials: 'include' })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        setUsers(data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteClick = (userId) => {
    setSelectedUserId(userId);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedUserId) {
      fetch(`${apiUrl}/api/user/deleteuser/${selectedUserId}`, {
        method: 'POST',
        credentials: 'include', // Include credentials for session management
      })
        .then(response => {
          if (response.ok) {
            fetchUsers(searchQuery);
          } else if (response.status === 401) {
            throw new Error('Unauthorized');
          } else {
            throw new Error('Network response was not ok.');
          }
        })
        .catch(error => {
          console.error('Error deleting user:', error);
        })
        .finally(() => {
          setShowModal(false);
          setSelectedUserId(null);
        });
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    fetchUsers(searchQuery);
  };

  return (
    <div>
      <h2 align="center">User List</h2>
      <div align="center" style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search by first name..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ marginRight: '10px', padding: '10px' }}
        />
        <button onClick={handleSearchClick} style={{ padding: '10px' }}>
          Search
        </button>
      </div>
      <table border="1px" width="100%" align="center" className="table table-striped table-bordered">
        <thead align="center">
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Login ID</th>
            <th>DOB</th>
            <th>Gender</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody align="center">
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.loginId}</td>
              <td>{new Date(user.dob).toLocaleDateString()}</td>
              <td>{user.gender}</td>
              <td>{user.role}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDeleteClick(user._id)}>Delete</button>
                <Link to={`/edituser/${user._id}`}><button className="btn btn-primary" style={{ marginLeft: '10px' }}>Edit</button></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button type="button" className="close" aria-label="Close" onClick={() => setShowModal(false)}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this user?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={handleConfirmDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
