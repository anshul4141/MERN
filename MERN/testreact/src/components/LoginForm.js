import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { environment } from '../environment.ts';

const LoginForm = ({ setAuth }) => {
  const [formData, setFormData] = useState({
    loginId: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [validationMessages, setValidationMessages] = useState({
    loginId: '',
    password: '',
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setValidationMessages({
      ...validationMessages,
      [name]: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    let messages = {};

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

    setValidationMessages(messages);

    const apiUrl = environment.apiUrl;

    if (valid) {
      console.log(apiUrl, " <======= url");
      fetch(`${apiUrl}/api/user/authenticate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(formData),
        credentials: 'include',
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Invalid credentials');
        })
        .then((data) => {
          localStorage.setItem('user', JSON.stringify(data.user));
          setAuth(data.user);
          navigate('/');
        })
        .catch((error) => {
          setMessage(error.message);
        });
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <div className="card" style={{ background: 'linear-gradient(to right, #00c6ff, #0072ff)' }}>
            <div className="card-body">
              <h2 className="card-title text-center">Login</h2>
              {message && <div className="alert alert-info">{message}</div>}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Login ID</label>
                  <input
                    type="text"
                    name="loginId"
                    value={formData.loginId}
                    onChange={handleChange}
                    placeholder="Enter Login ID"
                    className="form-control"
                  />
                  {validationMessages.loginId && <div className="text-danger">{validationMessages.loginId}</div>}
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter Password"
                    className="form-control"
                  />
                  {validationMessages.password && <div className="text-danger">{validationMessages.password}</div>}
                </div>
                &nbsp;
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">Login</button>
                  <Link to={'/signUp'}>
                    <button className="btn btn-primary" style={{ marginLeft: '10px' }}>Sign Up</button>
                  </Link>
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

export default LoginForm;