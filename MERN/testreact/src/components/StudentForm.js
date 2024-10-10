import React, { useState, useEffect } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import { environment } from '../environment.ts';

const StudentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    school: '',
    dob: '',
    mobileNo: '',
    gender: ''
  });
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(true); // Added state for message visibility
  const [validationMessages, setValidationMessages] = useState({
    name: '',
    subject: '',
    school: '',
    dob: '',
    mobileNo: '',
    gender: ''
  });

  const apiUrl = environment.apiUrl

  useEffect(() => {
    if (id) {
      fetch(`${apiUrl}/api/student/getstudent/${id}`, { credentials: 'include' })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else if (response.status === 401) {
            throw new Error('Unauthorized');
          } else {
            throw new Error('Network response was not ok.');
          }
        })
        .then(data => {
          data.dob = new Date(data.dob).toISOString().split('T')[0];
          setFormData(data);
        })
        .catch(error => {
          console.error('Error fetching user:', error);
        });
    }
  }, [id]);

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

    if (!formData.name) {
      valid = false;
      messages.name = 'Name is required';
    }
    if (!formData.subject) {
      valid = false;
      messages.subject = 'subject is required';
    }
    if (!formData.school) {
      valid = false;
      messages.school = 'school is required';
    } 
    if (!formData.dob) {
      valid = false;
      messages.dob = 'Date of Birth is required';
    }
    if (!formData.mobileNo) {
        valid = false;
        messages.mobileNo = 'mobileNo is required';
      }
    if (!formData.gender) {
      valid = false;
      messages.gender = 'Gender is required';
    }
    

    setValidationMessages(messages);

    if (valid) {
      const url = id ? `${apiUrl}/api/student/updatestudent/${id}` : `${apiUrl}/api/student/addstudent`;
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
            throw new Error('Network Response is not ok.');
          }
        })
        .then((data) => {
          setFormData({
            name: '',
            subject: '',
            school: '',
            dob: '',
            mobileNo: '',
            gender: ''
          });
          setMessage(data.message);
          setShowMessage(true); // Ensure message is shown
          navigate('/studentList');
        })
        .catch(error => {
          console.error('Error submitting form:', error);
          setMessage(error.message);
          setShowMessage(true); // Ensure message is shown
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
              <h2 className="card-title text-center">{id ? 'Edit Student' : 'Add Student'}</h2>
              {showMessage && message && (
                <div className="alert alert-info alert-dismissible fade show" role="alert">
                  {message}
                  <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseMessage}></button>
                </div>
              )}
              <form>
                <div className="form-group">
                  <label>Student Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter Name" className="form-control" />
                  {validationMessages.name && <div className="text-danger">{validationMessages.name}</div>}
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Enter subject Name" className="form-control" />
                  {validationMessages.subject && <div className="text-danger">{validationMessages.subject}</div>}
                </div>
                <div className="form-group">
                  <label>School</label>
                  <input type="text" name="school" value={formData.school} onChange={handleChange} placeholder="Enter School" className="form-control" />
                  {validationMessages.school && <div className="text-danger">{validationMessages.school}</div>}
                </div>
                <div className="form-group">
                  <label>Date of Birth</label>
                  <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="form-control" />
                  {validationMessages.dob && <div className="text-danger">{validationMessages.dob}</div>}
                </div>
                <div className="form-group">
                  <label>MobileNo</label>
                  <input type="text" name="mobileNo" value={formData.mobileNo} onChange={handleChange} placeholder="Enter mobileNo" className="form-control" />
                  {validationMessages.mobileNo && <div className="text-danger">{validationMessages.mobileNo}</div>}
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
                &nbsp;
                <div className="text-center">
                  <button type="button" onClick={handleSubmit} className="btn btn-primary">Submit</button>
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

export default StudentForm;