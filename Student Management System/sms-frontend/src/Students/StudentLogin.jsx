import { useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentLogin = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    // TODO: Connect to Django backend
    console.log("Login Data:", credentials);
    localStorage.setItem("studentToken", "demo_token");
    navigate("/student/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-green-300">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-600">Student Login</h2>
        <input type="email" name="email" placeholder="Email Address" onChange={handleChange} className="w-full mb-4 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400" required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full mb-6 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400" required />
        <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-all">Login</button>
      </form>
    </div>
  );
};

export default StudentLogin;