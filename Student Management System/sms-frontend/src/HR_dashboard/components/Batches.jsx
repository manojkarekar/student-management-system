import { useState } from 'react'

const initialBatches = [
  { id: 1, name: 'Batch A', startDate: '2024-01-10' },
  { id: 2, name: 'Batch B', startDate: '2024-02-20' },
  { id: 3, name: 'Batch C', startDate: '2024-02-20' },
]

export default function Batches() {
  const [batches, setBatches] = useState(initialBatches)
  const [form, setForm] = useState({ name: '', startDate: '' })
  const [editId, setEditId] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleAddOrUpdate = () => {
    if (!form.name || !form.startDate) return

    if (editId) {
      setBatches((prev) =>
        prev.map((b) => (b.id === editId ? { ...b, ...form } : b))
      )
      setEditId(null)
    } else {
      const newBatch = {
        id: Date.now(),
        ...form,
      }
      setBatches((prev) => [...prev, newBatch])
    }

    setForm({ name: '', startDate: '' })
  }

  const handleEdit = (batch) => {
    setForm({ name: batch.name, startDate: batch.startDate })
    setEditId(batch.id)
  }

  const handleDelete = (id) => {
    setBatches((prev) => prev.filter((b) => b.id !== id))
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Batch Management</h1>

      <div className="bg-white p-6 rounded-lg shadow mb-6 max-w-lg">
        <h2 className="text-lg font-semibold mb-2">{editId ? 'Edit' : 'Add'} Batch</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Batch Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="date"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={handleAddOrUpdate}
          >
            {editId ? 'Update' : 'Add'} Batch
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">All Batches</h2>
        {batches.length === 0 ? (
          <p className="text-gray-500">No batches found.</p>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4">Batch Name</th>
                <th className="py-2 px-4">Start Date</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {batches.map((batch) => (
                <tr key={batch.id} className="border-t">
                  <td className="py-2 px-4">{batch.name}</td>
                  <td className="py-2 px-4">{batch.startDate}</td>
                  <td className="py-2 px-4 space-x-2">
                    <button
                      className="px-3 py-1 bg-yellow-400 text-white rounded"
                      onClick={() => handleEdit(batch)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded"
                      onClick={() => handleDelete(batch.id)}
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
