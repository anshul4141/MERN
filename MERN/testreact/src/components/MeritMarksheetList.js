import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { environment } from '../environment.ts';

const MeritMarksheetList = () => {
  const [marksheets, setMarksheets] = useState([]);

  const apiUrl = environment.apiUrl;

  const fetchMarksheets = () => {
    fetch(`${apiUrl}/api/marksheet/getMeritList`, { credentials: 'include' })
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

  return (
    <div>
      <h2 align="center">Marksheet List</h2>
      <table border="1px" width="100%" align="center" className="table">
        <thead align="center">
          <tr>
            <th>Name</th>
            <th>Roll No</th>
            <th>Physics</th>
            <th>Chemistry</th>
            <th>Maths</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MeritMarksheetList;
