  // src/components/StudentLogin.js
  import React, { useContext, useState } from 'react';
  import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';


  const StudentLogin = () => {
    const [form, setForm] = useState({ username: '', password: '' });
    const [message, setMessage] = useState('');
  
    // used to navigate to redirected in student dashboard page
    const navigate = useNavigate();

    // use context here...
    const {login} = useContext(AuthContext);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post('http://localhost:8000/api/student/login/', form);
        // setToken(res.data.token);
        login(res.data.token);

        setMessage('Login successful');


        // localStorage.setItem('student_token', res.data.token);

        // redirected dashboard page after success login
         navigate('/student/home');
      } catch (err) {
        setMessage('Login failed: ' + err.response.data.error);
      }
    };

    return (
      <div>
        <h2>Student Login</h2>
        <form onSubmit={handleSubmit}>
          <input name="username" placeholder="Username" onChange={handleChange} required /><br />
          <input name="password" placeholder="Password" type="password" onChange={handleChange} required /><br />
          <button type="submit" style={{color:"yellow"}}>Login</button>
        </form>
        <p>{message}</p>
       
      </div>
    );
  };

  export default StudentLogin;
