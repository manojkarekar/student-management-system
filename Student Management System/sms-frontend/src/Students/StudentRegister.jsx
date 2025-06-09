import { useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentRegister = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Connect to Django backend
    console.log("Register Data:", formData);
    navigate("/student/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Student Registration</h2>
        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} className="w-full mb-4 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400" required />
        <input type="email" name="email" placeholder="Email Address" onChange={handleChange} className="w-full mb-4 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400" required />
        <input type="password" name="password" placeholder="Create Password" onChange={handleChange} className="w-full mb-6 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400" required />
        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all">Register</button>
      </form>
    </div>
  );
};

export default StudentRegister;