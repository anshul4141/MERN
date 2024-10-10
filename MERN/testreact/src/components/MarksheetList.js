import React, { useEffect, useState } from 'react';
import { environment } from '../environment.ts';
// import { Link } from 'react-router-dom';

const MarksheetList = ({ user }) => { // Receive user as a prop
  const [marksheets, setMarksheets] = useState([]);
  const [selectedMarksheetId, setSelectedMarksheetId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const apiUrl = environment.apiUrl;

  const fetchMarksheets = () => {
    fetch(`${apiUrl}/api/marksheet/searchMarksheets`, { credentials: 'include' })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        setMarksheets(data);
      })
      .catch(error => {
        console.error('Error fetching marksheets:', error);
      });
  };

  useEffect(() => {
    fetchMarksheets();
  }, []);

  // const handleDeleteClick = (marksheetId) => {
  //   setSelectedMarksheetId(marksheetId);
  //   setShowModal(true);
  // };

  const handleConfirmDelete = () => {
    if (selectedMarksheetId) {
      fetch(`${apiUrl}/api/marksheet/deleteMarksheet/${selectedMarksheetId}`, {
        method: 'POST',
        credentials: 'include', // Include credentials for session management
      })
        .then(response => {
          if (response.ok) {
            fetchMarksheets();
          } else if (response.status === 401) {
            throw new Error('Unauthorized');
          } else {
            throw new Error('Network response was not ok.');
          }
        })
        .catch(error => {
          console.error('Error deleting marksheet:', error);
        })
        .finally(() => {
          setShowModal(false);
          setSelectedMarksheetId(null);
        });
    }
  };

  const calculateTotal = (marksheet) => {
    return marksheet.physics + marksheet.chemistry + marksheet.maths;
  };

  const calculatePercentage = (marksheet) => {
    const total = calculateTotal(marksheet);
    return (total / 300) * 100; // Assuming each subject is out of 100
  };

  const calculatePassFail = (marksheet) => {
    return marksheet.physics >= 33 && marksheet.chemistry >= 33 && marksheet.maths >= 33 ? 'Pass' : 'Fail';
  };

  return (
    <div>
      <h2 align="center">Marksheet List</h2>
      <table border="1px" width="100%" align="center" className="table table-striped table-bordered">
        <thead align="center">
          <tr>
            <th>Name</th>
            <th>Roll No</th>
            <th>Physics</th>
            <th>Chemistry</th>
            <th>Maths</th>
            <th>Total</th>
            <th>Percentage</th>
            <th>Pass/Fail</th>
            {/* <th>Action</th> */}
          </tr>
        </thead>
        <tbody align="center">
          {marksheets.map(marksheet => (
            <tr key={marksheet._id}>
              <td>{marksheet.name}</td>
              <td>{marksheet.rollNo}</td>
              <td>{marksheet.physics}</td>
              <td>{marksheet.chemistry}</td>
              <td>{marksheet.maths}</td>
              <td>{calculateTotal(marksheet)}</td>
              <td>{calculatePercentage(marksheet).toFixed(2)}%</td>
              <td>{calculatePassFail(marksheet)}</td>

              {/* <td>
                <button className="btn btn-danger" onClick={() => handleDeleteClick(marksheet._id)}>Delete</button>
                <Link to={`/editmarksheet/${marksheet._id}`}><button className="btn btn-primary" style={{ marginLeft: '10px' }}>Edit</button></Link>
              </td> */}

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
                Are you sure you want to delete this marksheet?
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

export default MarksheetList;
