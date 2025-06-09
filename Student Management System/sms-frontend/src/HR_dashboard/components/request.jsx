import React, { useState } from 'react';

// Dummy data
const students = [
  { id: 's1', name: 'Alice Smith', email: 'alice@student.com', phone: '1234567890' },
  { id: 's2', name: 'Bob Johnson', email: 'bob@student.com', phone: '0987654321' },
];

const trainers = [
  { id: 't1', name: 'John Doe', email: 'john@trainer.com', phone: '1112223333' },
  { id: 't2', name: 'Jane Lee', email: 'jane@trainer.com', phone: '4445556666' },
];

const ChangeRequestForm = () => {
  const [type, setType] = useState('student');
  const [selectedId, setSelectedId] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    reason: '',
  });

  const dataList = type === 'student' ? students : trainers;

  const handleSelectUser = (id) => {
    setSelectedId(id);
    const user = dataList.find((u) => u.id === id);
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        reason: '',
      });
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = {
      requestType: type,
      userId: selectedId,
      proposedChanges: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      },
      reason: formData.reason,
    };
    console.log('Request Sent to Admin:', request);
    alert('Change request sent (dummy)');
    setSelectedId('');
    setFormData({ name: '', email: '', phone: '', reason: '' });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          HR Change Request Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Type Selector */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Request Type</label>
            <select
              value={type}
              onChange={(e) => {
                setType(e.target.value);
                setSelectedId('');
                setFormData({ name: '', email: '', phone: '', reason: '' });
              }}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="student">Student</option>
              <option value="trainer">Trainer</option>
            </select>
          </div>

          {/* User Selector */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Select {type}</label>
            <select
              value={selectedId}
              onChange={(e) => handleSelectUser(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">-- Select --</option>
              {dataList.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          {/* Editable Fields */}
          {selectedId && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-1 font-medium">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1 font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-gray-700 mb-1 font-medium">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-1 font-medium">Reason for Change</label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  rows={4}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={
                  !formData.name || !formData.email || !formData.phone || !formData.reason
                }
                className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Submit Request
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default ChangeRequestForm;
