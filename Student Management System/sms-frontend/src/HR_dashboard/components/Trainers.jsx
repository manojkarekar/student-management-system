import { useState } from 'react'

const initialTrainers = [
  { id: 1, name: 'John Doe', email: 'john@training.com', subject: 'React' },
  { id: 2, name: 'Jane Smith', email: 'jane@training.com', subject: 'Node.js' },
]

export const Trainers =()=>{
  const [trainers, setTrainers] = useState(initialTrainers)
  const [form, setForm] = useState({ name: '', email: '', subject: '' })
  const [editId, setEditId] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleAddOrUpdate = () => {
    if (!form.name || !form.email || !form.subject) return

    if (editId) {
      setTrainers((prev) =>
        prev.map((t) => (t.id === editId ? { ...t, ...form } : t))
      )
      setEditId(null)
    } else {
      const newTrainer = {
        id: Date.now(),
        ...form,
      }
      setTrainers((prev) => [...prev, newTrainer])
    }

    setForm({ name: '', email: '', subject: '' })
  }

  const handleEdit = (trainer) => {
    setForm({ name: trainer.name, email: trainer.email, subject: trainer.subject })
    setEditId(trainer.id)
  }

  const handleDelete = (id) => {
    setTrainers((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Trainer Management</h1>

      <div className="bg-white p-6 rounded-lg shadow mb-6 max-w-lg">
        <h2 className="text-lg font-semibold mb-2">{editId ? 'Edit' : 'Add'} Trainer</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Trainer Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Trainer Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={form.subject}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={handleAddOrUpdate}
          >
            {editId ? 'Update' : 'Add'} Trainer
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">All Trainers</h2>
        {trainers.length === 0 ? (
          <p className="text-gray-500">No trainers found.</p>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Subject</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {trainers.map((trainer) => (
                <tr key={trainer.id} className="border-t">
                  <td className="py-2 px-4">{trainer.name}</td>
                  <td className="py-2 px-4">{trainer.email}</td>
                  <td className="py-2 px-4">{trainer.subject}</td>
                  <td className="py-2 px-4 space-x-2">
                    <button
                      className="px-3 py-1 bg-yellow-400 text-white rounded"
                      onClick={() => handleEdit(trainer)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded"
                      onClick={() => handleDelete(trainer.id)}
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
  )
}
