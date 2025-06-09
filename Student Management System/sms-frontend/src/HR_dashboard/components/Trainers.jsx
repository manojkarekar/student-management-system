import { useState } from "react";
import { Link } from "react-router-dom";

export default function Trainers() {
  const [trainers, setTrainers] = useState([
    { id: 1, name: "John Doe", email: "john@training.com", subject: "React" },
    { id: 2, name: "Jane Smith", email: "jane@training.com", subject: "Node.js" },
  ]);

  const [form, setForm] = useState({ name: "", email: "", subject: "" });
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = () => {
    if (!form.name.trim() || !form.email.trim() || !form.subject.trim()) return;

    if (editId) {
      setTrainers((prev) =>
        prev.map((t) => (t.id === editId ? { ...t, ...form } : t))
      );
      setEditId(null);
    } else {
      setTrainers((prev) => [...prev, { id: Date.now(), ...form }]);
    }

    setForm({ name: "", email: "", subject: "" });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8 mt-1">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
        Trainer Management
      </h1>

      {/* Form Section */}
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">
          {editId ? "Edit" : "Add"} Trainer
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Trainer Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Trainer Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:ring-blue-500"
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={form.subject}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:ring-blue-500"
          />
          <button
            onClick={handleAddOrUpdate}
            className="w-full bg-blue-600 text-white rounded-md p-2 hover:bg-blue-700 transition"
          >
            {editId ? "Update" : "Add"} Trainer
          </button>
        </div>
      </div>

      {/* Trainers List Section */}
      {/* Trainers List Section */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow max-w-full overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">All Trainers</h2>
        {trainers.length === 0 ? (
          <p className="text-gray-500 text-center">No trainers found.</p>
        ) : (
          <table className="min-w-[600px] w-full text-left border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 border-b">Name</th>
                <th className="p-3 border-b">Email</th>
                <th className="p-3 border-b">Subject</th>
                <th className="p-3 border-b whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {trainers.map((trainer) => (
                <tr key={trainer.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 break-words">
                    <Link
                      to={`/hr/trainer/${trainer.id}`}
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      {trainer.name}
                    </Link>
                  </td>
                  <td className="p-3 break-words">{trainer.email}</td>
                  <td className="p-3 break-words">{trainer.subject}</td>
                  <td className="p-3 space-x-2 whitespace-nowrap">
                    <button
                      className="px-3 py-1 bg-yellow-400 rounded text-white hover:bg-yellow-500 transition"
                      onClick={() => {
                        setForm({
                          name: trainer.name,
                          email: trainer.email,
                          subject: trainer.subject,
                        });
                        setEditId(trainer.id);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 bg-red-500 rounded text-white hover:bg-red-600 transition"
                      onClick={() =>
                        setTrainers((prev) => prev.filter((t) => t.id !== trainer.id))
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
}