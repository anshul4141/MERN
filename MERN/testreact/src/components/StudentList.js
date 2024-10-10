import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { environment } from '../environment.ts';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStudentId, setSelectedStudentId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const apiUrl = environment.apiUrl;

    const fetchStudent = (query = '') => {
        fetch(`${apiUrl}/api/student/searchstudent?query=${query}`, { credentials: 'include' })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                setStudents(data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    };

    useEffect(() => {
        fetchStudent();
    }, []);

    const handleDeleteClick = (userId) => {
        setSelectedStudentId(userId);
        setShowModal(true);
    };

    const handleConfirmDelete = () => {
        if (selectedStudentId) {
            fetch(`${apiUrl}/api/student/deletestudent/${selectedStudentId}`, {
                method: 'POST',
                credentials: 'include', // Include credentials for session management
            })
                .then(response => {
                    if (response.ok) {
                        fetchStudent(searchQuery);
                    } else if (response.status === 401) {
                        throw new Error('Unauthorized');
                    } else {
                        throw new Error('Network response was not ok.');
                    }
                })
                .catch(error => {
                    console.error('Error deleting student:', error);
                })
                .finally(() => {
                    setShowModal(false);
                    setSelectedStudentId(null);
                });
        }
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchClick = () => {
        fetchStudent(searchQuery);
    };

    return (
        <div>
            <h2 align="center">Student List</h2>
            <div align="center" style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Search by Student name..."
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
                        <th>Student Name</th>
                        <th>Subject</th>
                        <th>School</th>
                        <th>DOB</th>
                        <th>mobileNo</th>
                        <th>gender</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody align="center">
                    {students.map(student => (
                        <tr key={student._id}>
                            <td>{student.name}</td>
                            <td>{student.subject}</td>
                            <td>{student.school}</td>
                            <td>{new Date(student.dob).toLocaleDateString()}</td>
                            <td>{student.mobileNo}</td>
                            <td>{student.gender}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => handleDeleteClick(student._id)}>Delete</button>
                                <Link to={`/editstudent/${student._id}`}><button className="btn btn-primary" style={{ marginLeft: '10px' }}>Edit</button></Link>
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
                                Are you sure you want to delete this student?
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

export default StudentList;