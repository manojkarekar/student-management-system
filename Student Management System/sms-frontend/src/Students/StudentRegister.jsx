// src/components/StudentRegister.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentRegister = () => {
  // set register form data
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    confirm_password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/student/register/",
        form
      );
      setMessage("Registration successful. Token: " + res.data.token);
        navigate('/student/login');
    } catch (err) {
      // setMessage('Error: ' + JSON.stringify(err.response.data));
    }
  };

  return (
    <div>
      <h2>Student Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="first_name"
          placeholder="Enter first name"
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="last_name"
          placeholder="Enter last name"
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
          required
        />
        <br />
        <input
          name="confirm_password"
          placeholder="confirm_password"
          type="password"
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default StudentRegister;
