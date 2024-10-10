import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { environment } from '../environment.ts';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    loginId: '',
    password: '',
    dob: '',
    gender: '',
    role: 'student'
  });
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(true);
  const [validationMessages, setValidationMessages] = useState({
    firstName: '',
    lastName: '',
    loginId: '',
    password: '',
    dob: '',
    gender: '',
    role: ''
  });

  const apiUrl = environment.apiUrl;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setValidationMessages({
      ...validationMessages,
      [name]: ''
    });
  };

  const handleSubmit = () => {
    let valid = true;
    let messages = {};

    if (!formData.firstName) {
      valid = false;
      messages.firstName = 'First Name is required';
    }
    if (!formData.lastName) {
      valid = false;
      messages.lastName = 'Last Name is required';
    }
    if (!formData.loginId) {
      valid = false;
      messages.loginId = 'Login ID is required';
    } else if (!formData.loginId.endsWith('@gmail.com')) {
      valid = false;
      messages.loginId = 'Login ID is not in valid form';
    }
    if (!formData.password) {
      valid = false;
      messages.password = 'Password is required';
    }
    if (!formData.dob) {
      valid = false;
      messages.dob = 'Date of Birth is required';
    }
    if (!formData.gender) {
      valid = false;
      messages.gender = 'Gender is required';
    }

    setValidationMessages(messages);

    if (valid) {
      const url = `${apiUrl}/api/user/signup`;
      const method = 'POST';

      fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else if (response.status === 401) {
            throw new Error('Unauthorized');
          } else {
            throw new Error('Login Id already exists');
          }
        })
        .then((data) => {
          setFormData({
            firstName: '',
            lastName: '',
            loginId: '',
            password: '',
            dob: '',
            gender: '',
            role: 'student'
          });
          setMessage('User registered successfully, please login');
         // navigate('/login', { state: { message: 'User registered successfully, please login' } });
        })
        .catch(error => {
          console.error('Error submitting form:', error);
          setMessage(error.message);
        });
    }
  };

  const handleCloseMessage = () => {
    setShowMessage(false);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <div className="card" style={{ background: 'linear-gradient(to right, #00c6ff, #0072ff)' }}>
            <div className="card-body">
              <h2 className="card-title text-center">User Registration</h2>
              {showMessage && message && (
                <div className="alert alert-info alert-dismissible fade show" role="alert">
                  {message}
                  <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseMessage}></button>
                </div>
              )}
              <form>
                <div className="form-group">
                  <label>First Name</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Enter First Name" className="form-control" />
                  {validationMessages.firstName && <div className="text-danger">{validationMessages.firstName}</div>}
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Enter Last Name" className="form-control" />
                  {validationMessages.lastName && <div className="text-danger">{validationMessages.lastName}</div>}
                </div>
                <div className="form-group">
                  <label>Login ID</label>
                  <input type="text" name="loginId" value={formData.loginId} onChange={handleChange} placeholder="Enter Login ID" className="form-control" />
                  {validationMessages.loginId && <div className="text-danger">{validationMessages.loginId}</div>}
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter Password" className="form-control" />
                  {validationMessages.password && <div className="text-danger">{validationMessages.password}</div>}
                </div>
                <div className="form-group">
                  <label>Date of Birth</label>
                  <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="form-control" />
                  {validationMessages.dob && <div className="text-danger">{validationMessages.dob}</div>}
                </div>
                <div className="form-group">
                  <label>Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} className="form-control">
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {validationMessages.gender && <div className="text-danger">{validationMessages.gender}</div>}
                </div>
                <input type="hidden" name="role" value={formData.role} />
                &nbsp;
                <div className="text-center">
                  <button type="button" onClick={handleSubmit} className="btn btn-primary">Submit</button>
                  <Link to={'/login'}><button className="btn btn-primary" style={{ marginLeft: '10px' }}>SignIn</button></Link>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
  );
};

export default SignUp;