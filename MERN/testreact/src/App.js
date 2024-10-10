import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom'; // Use HashRouter
import { environment } from './environment.ts';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import LoginForm from './components/LoginForm';
import MarksheetForm from './components/MarksheetForm';
import MarksheetList from './components/MarksheetList';
import MeritMarksheetList from './components/MeritMarksheetList';
import SignUp from './components/SignUp';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';

const App = () => {
  const [user, setUser] = useState(null); // Store user details

  const apiUrl = environment.apiUrl;

  const handleLogout = () => {
    fetch(`${apiUrl}/api/user/logout`, {
      method: 'POST',
      // credentials: 'include',
    })
      .then(response => {
        if (response.ok) {
          localStorage.removeItem('user');
          setUser(null);
        } else {
          throw new Error('Logout failed');
        }
      })
      .catch(error => {
        console.error('Error logging out:', error);
      });
  };

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      setUser(null);
    }
  }, []);

  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link className="navbar-brand" to="/">Home</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {user ? (
                <>
                  {user.role === 'admin' ? (
                    <>
                      <li className="nav-item">
                        <Link className="nav-link" to="/adduser">Add User</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/UserList">User List</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/addMarksheet">Add Marksheet</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/MarksheetList">Marksheet List</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/MeritMarksheetList">Merit Marksheet List</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/addStudent">Add Student</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/studentList">Student List</Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="nav-item">
                        <Link className="nav-link" to="/MarksheetList">Marksheet List</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/MeritMarksheetList">Merit Marksheet List</Link>
                      </li>
                    </>
                  )}
                  <li className="nav-item">
                    <button className="nav-link btn" onClick={handleLogout}>Logout</button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signUp">Sign Up</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<h2 align="center">Welcome to Online Result System</h2>} />
          {user ? (
            <>
              <Route path="/adduser" element={user.role === 'admin' ? <UserForm /> : <Navigate to="/" />} />
              <Route path="/UserList" element={user.role === 'admin' ? <UserList /> : <Navigate to="/" />} />
              <Route path="/edituser/:id" element={user.role === 'admin' ? <UserForm /> : <Navigate to="/" />} />
              <Route path="/addMarksheet" element={user.role === 'admin' ? <MarksheetForm /> : <Navigate to="/" />} />
              <Route path="/MarksheetList" element={<MarksheetList />} />
              <Route path="/editmarksheet/:id" element={user.role === 'admin' ? <MarksheetForm /> : <Navigate to="/" />} />
              <Route path="/MeritMarksheetList" element={<MeritMarksheetList />} />
              <Route path="/addStudent" element={<StudentForm />} />
              <Route path="/studentList" element={<StudentList />} />
              <Route path="/editstudent/:id" element={<StudentForm />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<LoginForm setAuth={(user) => setUser(user)} />} />
              <Route path="/signUp" element={<SignUp />} />
            </>
          )}
          <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;