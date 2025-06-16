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
  const [errors, setErrors] = useState({});

  const [userId, setUserId] = useState(null);
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [Token, setToken] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setErrors({});

    // if (form.password !== form.confirm_password) {
    //   setErrors({ confirm_password: "password do not match.." });
    //   return;

    // }

    try {
      const res = await axios.post(
        "http://localhost:8000/api/student/register/",
        form
      );
      setUserId(res.data.user_id);
      setToken(res.data.token);
      console.log(res.data);

      setShowOtpInput(true);
      setMessage("Registration successful. Please check your email for OTP.");
      // navigate("/student/login");
    } catch (err) {
      // if(response.err == )
      if (err.response && err.response.status === 400) {
        console.log(err.response.data);
        setErrors(err.response.data);
      } else {
        console.log("error: ");
      }
    }
  };

  // otp verification
  const HandleVerifyotp = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/student/verify-email/",
        {
          user_id: userId,
          otp: otp,
        },
        {
          headers: {
            Authorization: `Token ${Token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert(response.data.message);
      navigate("/student/login");
    } catch (error) {
      alert(error.response.data.error || "Verification failed..");
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
        />
        <br />
        <input
          name="last_name"
          placeholder="Enter last name"
          onChange={handleChange}
        />
        <br />
        <input name="username" placeholder="Username" onChange={handleChange} />
        <br />
        {errors.username && (
          <small style={{ color: "red" }}>{errors.username}</small>
        )}
        <br />
        <input name="email" placeholder="Email" onChange={handleChange} />{" "}
        <br />
        {errors.email && <small style={{ color: "red" }}>{errors.email}</small>}
        <br />
        <input
          name="password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
        />{" "}
        <br />
        {errors.password && (
          <small style={{ color: "red" }}>{errors.password}</small>
        )}
        <br />
        <input
          name="confirm_password"
          placeholder="confirm_password"
          type="password"
          onChange={handleChange}
        />{" "}
        <br />
        {errors.confirm_password && (
          <small style={{ color: "red" }}>{errors.confirm_password}</small>
        )}
        <br />
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>

      {/* otp verification.... */}
      {showOtpInput ? (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={HandleVerifyotp}>Verify OTP</button>
        </>
      ) : (
        <form onSubmit={handleSubmit}>{/* form inputs here */}</form>
      )}
    </div>
  );
};

export default StudentRegister;
